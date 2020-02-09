import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
const app = express()

import {schemas, loaders as loadersObject, Loaders} from './schema'
import {createMongoConnection, models, AuthenticatedUserDocument} from '@luminate/mongo'
import DataLoader from 'dataloader'
import {LoaderContext, parseUserFromRequest} from '@luminate/graphql-utils'

const PORT = 3001

export interface Context {
  req: express.Request
  res: express.Response
  models: typeof models
  loaders: LoaderContext<Loaders>
  user: AuthenticatedUserDocument | null
}

const startServer = async () => {
  await createMongoConnection(process.env.MONGO_URL)

  const server = new ApolloServer({
    schema: buildFederatedSchema(schemas),
    context: ({req, res}): Context => {
      const user = parseUserFromRequest(req)
      const loaders = Object.keys(loadersObject).reduce((acc, loaderName) => {
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

  server.applyMiddleware({app, cors: true})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
