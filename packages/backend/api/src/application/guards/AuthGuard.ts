import jwt from 'jsonwebtoken'
import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'

const tokenSecret = process.env.USER_AUTH_TOKEN || 'supersecretpassword'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx).getContext()
    if (!context.headers.authorization) {
      throw new UnauthorizedException()
    }

    const [bearer, token] = context.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new UnauthorizedException()
    }

    try {
      const user = jwt.verify(token, tokenSecret)
      context.user = user
      return true
    } catch {
      return false
    }
  }
}
