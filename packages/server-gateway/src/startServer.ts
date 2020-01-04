import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway'
import {createMongoConnection, models, RoleDocument, ScopeDocument, UserWithScopesDocument} from '@luminate/mongo'
import {parseToken} from '@luminate/graphql-utils'
import tokenJSON from './token.json'
import cookieParser from 'cookie-parser'
import express from 'express'
const app = express()

app.use(cookieParser())

const PORT = process.env.PORT || 3000

export interface Context {
  req: express.Request
  res: express.Response
  user: UserWithScopesDocument
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  // add x-auth-user header to all service requests
  willSendRequest({request, context}: {request: any; context: any}) {
    const userString = JSON.stringify(context.user)
    if (userString) {
      request.http.headers.set('x-auth-user', Buffer.from(userString).toString('base64'))
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

  const gateway = new ApolloGateway({
    serviceList: [
      {name: 'auth', url: 'http://localhost:3003/graphql'},
      {name: 'luminate', url: 'http://localhost:3001/graphql'},
      {name: 'sensory-eval', url: 'http://localhost:3002/graphql'},
    ],
    buildService: ({url}) => {
      return new AuthenticatedDataSource({url})
    },
  })

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: async ({req, res}) => {
      let token, user
      if (req.cookies.id) {
        try {
          token = parseToken(req.cookies.id, tokenJSON.token)
          if (token) {
            const dbUser = await models.User.findById(token.userId).populate({
              path: 'roles',
              populate: {path: 'scopes'},
            })

            const roles = (dbUser?.roles as unknown) as RoleDocument[]

            user = {
              ...dbUser,
              scopes: roles.reduce((acc, role) => {
                const scopes = (role.scopes as unknown) as ScopeDocument[]
                const newScopes = scopes.filter(
                  scope => !acc.find(existingScope => existingScope._id.toString() === scope._id.toString()),
                )
                return acc.concat(newScopes)
              }, [] as ScopeDocument[]),
            }
          }
        } catch (err) {}
      }

      return {
        req,
        res,
        user,
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
