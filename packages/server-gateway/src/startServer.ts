import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {ApolloGateway} from '@apollo/gateway'
import express from 'express'
const app = express()

const PORT = process.env.PORT || 3000

export interface Context {
  req: express.Request
  res: express.Response
}

const startServer = async () => {
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

  const gateway = new ApolloGateway({
    serviceList: [
      {name: 'luminate', url: 'http://localhost:3001/graphql'},
      {name: 'sensory-eval', url: 'http://localhost:3002/graphql'},
    ],
  })

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({req, res}) => {
      return {
        req,
        res,
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
