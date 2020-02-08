import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
const app = express()

import {schemas, loaders as loadersObject, Loaders} from './schema'
import {createMongoConnection, models, AuthenticatedUserDocument} from '@luminate/mongo'
import DataLoader from 'dataloader'
import {LoaderContext, parseUserFromRequest} from '@luminate/graphql-utils'

const PORT = 5000

export interface Context {
  req: express.Request
  res: express.Response
  models: typeof models
  loaders: LoaderContext<Loaders>
  user: AuthenticatedUserDocument | null
}

const startServer = async () => {
  await createMongoConnection(process.env.MONGO_URL)
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

      return {
        req,
        res,
        models,
        loaders,
        user,
      }
    },
    introspection: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    // process.env.NODE_ENV === 'production'
    //   ? false
    //   : {
    //       settings: {
    //         'request.credentials': 'include',
    //       },
    //     },
  })

  // server.applyMiddleware({app, cors: corsOptions})
  server.applyMiddleware({app, cors: true})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
