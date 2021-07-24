import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {GraphQLModule} from '@nestjs/graphql'
import {Request, Response} from 'express'
import {CorsOptions} from 'apollo-server-express'
import {InfraModule} from '../infra/InfraModule'
import {CommandModule} from './commands/CommandModule'
import {QueryModule} from './queries/QueryModule'
import {SchemaModule} from './schema/SchemaModule'
import {Token} from '@luminate/mongo-utils'
import {parseTokenFromRequest} from '@luminate/graphql-utils'

const port = process.env.PORT || 3000
const frontend = process.env.FRONTEND_URL || 'http://localhost:8000'

const tokenSecret = process.env.USER_AUTH_TOKEN || 'supersecretpassword'

export interface Context {
  res: Response
  user?: Token
  refreshToken: string
}

const allowList = [`http://localhost:${port}`, frontend]
const cors: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowList.includes(origin)) return callback(null, true)

    callback(new Error('Request rejected by CORS'))
  },
  credentials: true,
}

@Module({
  imports: [
    CqrsModule,
    GraphQLModule.forRoot({
      typePaths: ['./src/application/schema/*.graphql'],
      context: ({req, res}: {req: Request; res: Response}): Context => {
        let user: Token

        try {
          user = parseTokenFromRequest(req, tokenSecret)
        } catch {}

        return {
          res,
          user,
          refreshToken: req.cookies.lmt_ref,
        }
      },
      playground:
        process.env.NODE_ENV !== 'production'
          ? {
              settings: {
                'request.credentials': 'include',
              },
            }
          : false,
      cors,
    }),
    InfraModule,
    CommandModule,
    QueryModule,
    SchemaModule,
  ],
  exports: [CommandModule, QueryModule, SchemaModule],
})
export class ApplicationModule {}
