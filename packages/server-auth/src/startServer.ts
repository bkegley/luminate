import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
const app = express()

import {schemas, loaders as loadersObject, Loaders} from './schema'
import {createMongoConnection, models, seedDatabase, AccountService, RoleService, UserService} from '@luminate/mongo'
import DataLoader from 'dataloader'
import {LoaderContext, parseUserFromRequest, parseToken, Token, ContextBuilder} from '@luminate/graphql-utils'

const PORT = process.env.PORT || 3001

export interface Context {
  req: express.Request
  res: express.Response
  models: typeof models
  loaders: LoaderContext<Loaders>
  user: Token | null
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
      const {services, loaders} = contextBuilder
        .withDataLoader(loadersObject)
        .withAccount()
        .withRole()
        .withUser()
        .build()

      const user = parseUserFromRequest(req)

      return {
        req,
        res,
        models,
        loaders,
        user,
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
