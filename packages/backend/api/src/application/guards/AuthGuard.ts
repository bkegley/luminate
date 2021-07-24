import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx).getContext()

    if (!context.user) {
      throw new UnauthorizedException()
    }

    return true
  }
}
