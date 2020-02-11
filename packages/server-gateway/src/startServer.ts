import {ApolloServer, CorsOptions} from 'apollo-server-express'
import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway'
import {
  createMongoConnection,
  models,
  RoleDocument,
  ScopeDocument,
  AuthenticatedUserDocument,
  AccountDocument,
} from '@luminate/mongo'
import {parseToken} from '@luminate/graphql-utils'
import cookieParser from 'cookie-parser'
import express from 'express'
const app = express()

app.use(cookieParser())

const PORT = 3000
const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'
const NODE_ENV = process.env.NODE_ENV || 'development'

export interface Context {
  req: express.Request
  res: express.Response
  user: AuthenticatedUserDocument | null
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
  await createMongoConnection(process.env.MONGO_URL)
  //configure cors
  const whitelist = [
    'http://localhost:8000',
    'https://luminate.coffee',
    'http://api.luminate.coffee',
    'http://staging.luminate.coffee',
    'https://api.luminate.coffee',
    'https://staging.luminate.coffee',
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
      {name: 'auth', url: `${buildHostname(NODE_ENV)}:3003/graphql`},
      {name: 'encyclopedia', url: `${buildHostname(NODE_ENV)}:3001/graphql`},
      {name: 'sensory-eval', url: `${buildHostname(NODE_ENV)}:3002/graphql`},
    ],
    buildService: ({url}) => {
      return new AuthenticatedDataSource({url})
    },
  })

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: async ({req, res}) => {
      let token: ReturnType<typeof parseToken> | undefined
      let user: AuthenticatedUserDocument | null | undefined
      let account: AuthenticatedUserDocument['account']
      let roles: RoleDocument[] | undefined
      let scopes: AuthenticatedUserDocument['scopes']

      if (req.cookies.id) {
        try {
          token = parseToken(req.cookies.id, USER_AUTH_TOKEN)
          if (token) {
            user = (await models.User.findById(token.userId)
              .populate({path: 'account'})
              .populate({path: 'accounts'})
              .populate({
                path: 'roles.roles',
                populate: {path: 'scopes'},
              })) as AuthenticatedUserDocument | null | undefined

            if (user) {
              const accounts = (user.accounts as unknown) as AccountDocument[] | undefined
              account = accounts?.find(account => account._id.toString() === token?.accountId)
              roles = user?.roles
                ?.filter(role => account && role.account.toString() === account.toString())
                .map(role => (role.roles as unknown) as RoleDocument)
                .flat()

              scopes = roles?.reduce((acc, role) => {
                const scopes = (role.scopes as unknown) as ScopeDocument[]
                const newScopes = scopes.filter(
                  scope => !acc.find(existingScope => existingScope._id.toString() === scope._id.toString()),
                )
                return acc.concat(newScopes)
              }, [] as ScopeDocument[])
            }
          }
        } catch (err) {}
      }

      return {
        req,
        res,
        user: {
          ...user?.toObject(),
          account,
          roles,
          scopes,
        },
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

  server.applyMiddleware({app, cors: corsOptions})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
