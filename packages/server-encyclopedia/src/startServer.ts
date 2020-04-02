import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
const app = express()

import {schemas, loaders as loadersObject, Loaders} from './schema'
import {createMongoConnection, models} from '@luminate/mongo'
import {LoaderContext, parseUserFromRequest, Token, ContextBuilder} from '@luminate/graphql-utils'
import {
  CoffeeService,
  CountryService,
  DeviceService,
  FarmService,
  NoteService,
  RegionService,
  VarietyService,
} from '@luminate/mongo'

const PORT = process.env.PORT || 3002

export interface Context {
  req: express.Request
  res: express.Response
  models: typeof models
  loaders: LoaderContext<Loaders>
  user: Token | null
  services: {
    coffee: CoffeeService
    country: CountryService
    device: DeviceService
    farm: FarmService
    note: NoteService
    region: RegionService
    variety: VarietyService
  }
}

const startServer = async () => {
  await createMongoConnection(process.env.MONGO_URL)

  const server = new ApolloServer({
    schema: buildFederatedSchema(schemas),
    context: ({req, res}) => {
      const contextBuilder = new ContextBuilder(req)
      const {services, loaders} = contextBuilder
        .withDataLoader(loadersObject)
        .withCoffee()
        .withCountry()
        .withFarm()
        .withNote()
        .withRegion()
        .withVariety()
        .build()

      const user = parseUserFromRequest(req)

      return {
        req,
        res,
        models,
        services,
        loaders,
        user,
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

  server.applyMiddleware({app, cors: true})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
