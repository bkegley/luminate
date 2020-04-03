import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
const app = express()

import {schemas} from './schema'
import {createMongoConnection, models, seedDatabase, AccountService, RoleService, UserService} from '@luminate/mongo'
import {LoaderContext, parseUserFromRequest, parseToken, Token, ContextBuilder} from '@luminate/graphql-utils'

const PORT = process.env.PORT || 3001

export interface Context {
  res: express.Response
  services: {
    account: AccountService
    role: RoleService
    user: UserService
  }
}

const startServer = async () => {
  await createMongoConnection(process.env.MONGO_URL)
  await seedDatabase()

  const server = new ApolloServer({
    schema: buildFederatedSchema(schemas),
    context: ({req, res}): Context => {
      const contextBuilder = new ContextBuilder(req)
      const {services} = contextBuilder
        .withAccount()
        .withRole()
        .withUser()
        .build()

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

  server.applyMiddleware({app, cors: true})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
