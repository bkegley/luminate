import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {Reflector} from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler())
    const authenticated = this.reflector.get<boolean>('authenticated', context.getHandler())

    if (!scopes && !authenticated) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().user

    if (!scopes) {
      return !!user
    }

    if (!user) {
      return false
    }

    return scopes.every(scope => user.scopes.includes(scope))
  }
}
