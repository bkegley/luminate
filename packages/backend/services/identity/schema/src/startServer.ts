import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'

import {schemas} from './schema'
import {AccountService, RoleService, UserService} from './services'
import {seedDatabase} from './seedDatabase'
import {Container} from './utils'
import {createMongoConnection, Token} from '@luminate/mongo-utils'
import {parseUserFromRequest} from '@luminate/graphql-utils'

const PORT = process.env.PORT || 3001

export interface Context {
  res: express.Response
  services: {
    account: AccountService
    role: RoleService
    user: UserService
  }
}

class Server {
  private app = express()
  private port = process.env.PORT || 3001
  private container = new Container()

  private types = {
    User: Symbol('User'),
    AccountService: Symbol('AccountService'),
    PersonService: Symbol('PersonService'),
    RoleService: Symbol('RoleService'),
    UserService: Symbol('UserService'),
  }

  public async start() {
    await createMongoConnection(process.env.MONGO_URL)
    await seedDatabase()

    this.registerServices()

    const server = new ApolloServer({
      schema: buildFederatedSchema(schemas),
      context: ({req, res}): Context => {
        this.container.bind<Token | null>(this.types.User, parseUserFromRequest(req))

        const services = {
          account: this.container.resolve<AccountService>(this.types.AccountService),
          role: this.container.resolve<RoleService>(this.types.RoleService),
          user: this.container.resolve<UserService>(this.types.UserService),
        }

        return {
          res,
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
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`),
    )
  }

  private registerServices() {
    this.container.bind<AccountService>(
      this.types.AccountService,
      resolver => new AccountService(resolver.resolve(this.types.User)),
    )

    this.container.bind<RoleService>(
      this.types.RoleService,
      resolver => new RoleService(resolver.resolve(this.types.User)),
    )

    this.container.bind<UserService>(
      this.types.UserService,
      resolver => new UserService(resolver.resolve(this.types.User)),
    )
  }
}

const server = new Server()
server.start()
