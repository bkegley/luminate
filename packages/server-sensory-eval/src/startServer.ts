import {ApolloServer, CorsOptions} from 'apollo-server-express'
import express from 'express'
const app = express()

import {typeDefs, resolvers, loaders as loadersObject, Loaders} from './schema'
import {createMongoConnection, models} from '@luminate/mongo'
import DataLoader from 'dataloader'
import {LoaderContext} from '@luminate/graphql-utils'

const PORT = process.env.PORT || 3000

export interface Context {
  req: express.Request
  res: express.Response
  models: typeof models
  loaders: LoaderContext<Loaders>
}

const startServer = async () => {
  await createMongoConnection()
  // configure cors
  const whitelist = [`http://localhost:${PORT}`, 'http://localhost:8000']

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      // allow cors from deployment branches in netlify
      const originSplitForStaging = origin.split('--')
      const parsedOrigin = originSplitForStaging.length > 1 ? `https://${originSplitForStaging[1]}` : origin
      if (whitelist.includes(parsedOrigin)) return callback(null, true)

      callback(new Error('Request rejected by CORS'))
    },
    credentials: true,
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => {
      const loaders: Loaders = Object.keys(loadersObject).reduce((acc, loaderName) => {
        return {
          ...acc,
          //@ts-ignore
          [loaderName]: new DataLoader(ids => loadersObject[loaderName](ids, models)),
        }
      }, Object.assign(Object.keys(loadersObject)))
      return {
        req,
        res,
        models,
        loaders,
      }
    },
    playground:
      process.env.NODE_ENV === 'production'
        ? false
        : {
            settings: {
              'request.credentials': 'include',
            },
          },
  })

  server.applyMiddleware({app, cors: corsOptions})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
