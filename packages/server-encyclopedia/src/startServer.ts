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
import DataLoader from 'dataloader'
import {LoaderContext, parseUserFromRequest, Token} from '@luminate/graphql-utils'

const PORT = process.env.PORT || 3002

export interface Context {
  req: express.Request
  res: express.Response
  models: typeof models
  loaders: LoaderContext<Loaders>
  user: Token | null
}

const startServer = async () => {
  await createMongoConnection(process.env.MONGO_URL)

  const server = new ApolloServer({
    schema: buildFederatedSchema(schemas),
    context: ({req, res}) => {
      const user = parseUserFromRequest(req)
      const loaders: Loaders = Object.keys(loadersObject).reduce((acc, loaderName) => {
        return {
          ...acc,
          //@ts-ignore
          [loaderName]: new DataLoader(ids => loadersObject[loaderName](ids, models, user)),
        }
      }, Object.assign(Object.keys(loadersObject)))

      const {Region} = models

      return {
        req,
        res,
        models: {
          ...models,
          Region: Region.loadUser(user),
        },
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
