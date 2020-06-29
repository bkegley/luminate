import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
import {CuppingSessionService, DeviceService} from './services'
import {schemas} from './schema'
import {createMongoConnection, Token} from '@luminate/mongo-utils'
import {Container} from './utils'
import {parseUserFromRequest} from '@luminate/graphql-utils'

export interface Context {
  services: {
    cuppingSession: CuppingSessionService
    device: DeviceService
  }
}

class Server {
  private app = express()
  private port = process.env.PORT || 3003
  private container = new Container()

  private types = {
    User: Symbol('User'),
    CuppingSessionService: Symbol('CuppingSessionService'),
    DeviceService: Symbol('DeviceService'),
  }

  public async start() {
    await createMongoConnection(process.env.MONGO_URL)

    this.registerServices()

    const server = new ApolloServer({
      schema: buildFederatedSchema(schemas),
      context: ({req}) => {
        this.container.bind<Token | null>(this.types.User, parseUserFromRequest(req))
        const services: Context['services'] = {
          cuppingSession: this.container.resolve<CuppingSessionService>(this.types.CuppingSessionService),
          device: this.container.resolve<DeviceService>(this.types.DeviceService),
        }
        return {
          services,
        }
      },
      introspection: true,
      engine: false,
      playground:
        process.env.NODE_ENV === 'production'
          ? false
          : {
              settings: {
                'request.credentials': 'include',
              },
            },
    })

    server.applyMiddleware({app: this.app, cors: true})

    this.app.listen({port: this.port}, () =>
      console.log(`🚀 Server ready at http://localhost:${this.port}${server.graphqlPath}`),
    )
  }

  private registerServices() {
    this.container.bind<CuppingSessionService>(
      this.types.CuppingSessionService,
      resolver => new CuppingSessionService(resolver.resolve(this.types.User)),
    )
    this.container.bind<DeviceService>(
      this.types.DeviceService,
      resolver => new DeviceService(resolver.resolve(this.types.User)),
    )
  }
}

const server = new Server()
server.start()
