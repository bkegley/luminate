import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
const app = express()

import {schemas} from './schema'
import {createMongoConnection, CuppingSessionService} from '@luminate/mongo'
import {ContextBuilder} from '@luminate/graphql-utils'

const PORT = process.env.PORT || 3003

export interface Context {
  services: {
    cuppingSession: CuppingSessionService
  }
}

const startServer = async () => {
  await createMongoConnection(process.env.MONGO_URL)

  const server = new ApolloServer({
    schema: buildFederatedSchema(schemas),
    context: ({req}) => {
      const contextBuilder = new ContextBuilder(req)
      const {services} = contextBuilder.withCuppingSession().build()

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

  server.applyMiddleware({app, cors: true})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
