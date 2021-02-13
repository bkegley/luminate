import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway'
import {parseTokenFromRequest, Token} from '@luminate/graphql-utils'
import cookieParser from 'cookie-parser'
import express from 'express'
const app = express()

app.use(cookieParser())

const PORT = process.env.PORT || 3000
const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'supersecretpassword'
const DEPLOY_ENV = process.env.DEPLOY_ENV || 'development'

const SERVER_AUTH_URL = process.env.SERVER_AUTH_URL || 'http://localhost:3001/graphql'
const SERVER_ENCYCLOPEDIA_URL = process.env.SERVER_ENCYCLOPEDIA_URL || 'http://localhost:3002/graphql'
const SERVER_BREWING_URL = process.env.SERVER_BREWING_URL || 'http://localhost:3003/graphql'

export interface Context {
  req: express.Request
  res: express.Response
  user: Token | null
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  // forward Authorization header to services
  willSendRequest({request, context}: {request: any; context: any}) {
    if (context.headers) {
      request.http.headers.set('Authorization', context.headers.authorization)
      request.http.headers.set('X-Refresh-Token', context.refresh_token)
    }
  }

  // forward set-cookie headers to final response
  async process({request, context}: {request: any; context: any}) {
    const response = await super.process({request, context})
    const setCookieHeader = response.http?.headers.get('set-cookie')
    if (setCookieHeader) {
      context.res.set('set-cookie', setCookieHeader)
    }
    return response
  }
}

const startServer = async () => {
  //configure cors
  const whitelist = [
    `http://localhost:${PORT}`,
    'http://localhost:8001',
    'http://localhost:8003',
    'https://luminate.coffee',
    'http://api.luminate.coffee',
    'http://staging.luminate.coffee',
    'http://staging.api.luminate.coffee',
    'https://api.luminate.coffee',
    'https://staging.luminate.coffee',
    'https://staging.api.luminate.coffee',
  ]

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

  const buildHostname = (env: string) => {
    switch (env.toLowerCase()) {
      case 'production':
        return 'https://api.luminate.coffee'
      case 'staging':
        return 'https://staging.api.luminate.coffee'
      default:
        return 'http://localhost'
    }
  }

  const gateway = new ApolloGateway({
    serviceList: [
      {
        name: 'auth',
        url: SERVER_AUTH_URL,
      },
      {
        name: 'encyclopedia',
        url: SERVER_ENCYCLOPEDIA_URL,
      },
      {
        name: 'brewing',
        url: SERVER_BREWING_URL,
      },
    ],
    buildService: ({url}) => {
      return new AuthenticatedDataSource({url})
    },
  })

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: async ({req, res}) => {
      let user = null
      try {
        user = parseTokenFromRequest(req, USER_AUTH_TOKEN)
      } catch {}

      return {
        res,
        headers: req.headers,
        refresh_token: req.cookies.lmt_ref,
        user,
      }
    },
    introspection: true,
    engine: process.env.NODE_ENV === 'production' ? {apiKey: process.env.ENGINE_API_KEY} : false,
    playground:
      process.env.NODE_ENV !== 'production' || DEPLOY_ENV !== 'production'
        ? {
            settings: {
              'request.credentials': 'include',
            },
          }
        : false,
  })

  server.applyMiddleware({app, cors: corsOptions})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
