import {CanActivate, Injectable, ExecutionContext} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {Reflector} from '@nestjs/core'
import {AuthGuard} from '.'

@Injectable()
export class ScopeGuard extends AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(ctx: ExecutionContext) {
    const isAuthenticated = super.canActivate(ctx)
    if (!isAuthenticated) return false

    const context = GqlExecutionContext.create(ctx).getContext()
    const {user} = context

    const scopes = this.reflector.get<string[]>('scopes', ctx.getHandler())
    if (!scopes) return true

    if (!scopes.every(scope => user.scopes.includes(scope))) return false

    return true
  }
}
