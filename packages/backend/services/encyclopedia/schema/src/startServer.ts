import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
import {schemas} from './schema'
import {createMongoConnection, Token} from '@luminate/mongo-utils'
import {Container} from './utils'
import {CoffeeService, CountryService, FarmService, NoteService, RegionService, VarietyService} from './services'
import {parseUserFromRequest} from '@luminate/graphql-utils'

export interface Context {
  services: {
    coffee: CoffeeService
    country: CountryService
    farm: FarmService
    note: NoteService
    region: RegionService
    variety: VarietyService
  }
}

class Server {
  private app = express()
  private port = process.env.PORT || 3002
  private container = new Container()

  private types = {
    User: Symbol('User'),
    CoffeeService: Symbol('CoffeeService'),
    CountryService: Symbol('CountryService'),
    FarmService: Symbol('FarmService'),
    NoteService: Symbol('NoteService'),
    RegionService: Symbol('RegionService'),
    VarietyService: Symbol('VarietyService'),
  }

  public async start() {
    await createMongoConnection(process.env.MONGO_URL)

    this.registerServices()

    const server = new ApolloServer({
      schema: buildFederatedSchema(schemas),
      context: ({req}) => {
        this.container.bind<Token | null>(this.types.User, parseUserFromRequest(req))

        const services: Context['services'] = {
          coffee: this.container.resolve<CoffeeService>(this.types.CoffeeService),
          country: this.container.resolve<CountryService>(this.types.CountryService),
          farm: this.container.resolve<FarmService>(this.types.FarmService),
          note: this.container.resolve<NoteService>(this.types.NoteService),
          region: this.container.resolve<RegionService>(this.types.RegionService),
          variety: this.container.resolve<VarietyService>(this.types.VarietyService),
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
    this.container.bind(this.types.CoffeeService, resolver => new CoffeeService(resolver.resolve(this.types.User)))
    this.container.bind(this.types.CountryService, resolver => new CountryService())
    this.container.bind(this.types.FarmService, resolver => new FarmService(resolver.resolve(this.types.User)))
    this.container.bind(this.types.NoteService, resolver => new NoteService(resolver.resolve(this.types.User)))
    this.container.bind(this.types.RegionService, resolver => new RegionService())
    this.container.bind(this.types.VarietyService, resolver => new VarietyService(resolver.resolve(this.types.User)))
  }
}

const server = new Server()
server.start()
