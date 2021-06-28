import {Args, Context, Mutation, Query, Resolver, ResolveField, Parent} from '@nestjs/graphql'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Token} from '@luminate/graphql-utils'
import {CreateUserInput, UpdateUserInput, UpdateMeInput} from '../../types'
import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
  UpdateUserRolesCommand,
  UpdateMeCommand,
} from '../../application/commands'
import {AccountMapper, RoleMapper, UserMapper} from '../../infra/mappers'
import {ListUsersQuery, GetUserQuery} from '../queries'
import {ScopeGuard, Scopes} from '../guards'
import {AccountsRepo, RolesRepo} from '../../infra/repos'

@UseGuards(ScopeGuard)
@Resolver('Me')
export class MeResolvers {
  constructor(private readonly accountsRepo: AccountsRepo, private readonly rolesRepo: RolesRepo) {}

  @ResolveField()
  async account(@Context('user') user: Token) {
    if (!user?.account) {
      return null
    }

    return this.accountsRepo.getById(user.account.id)
  }

  @ResolveField()
  async accounts(@Context('user') user: Token) {
    if (!user?.accounts) {
      return null
    }

    return this.accountsRepo.list({id: {$in: user.accounts.map(account => account.id)}})
  }

  @ResolveField()
  async roles(@Context('user') user: Token) {
    if (!user?.roles) {
      return null
    }

    return this.rolesRepo.list({id: {$in: user.roles.map(role => role.id)}})
  }

  @ResolveField()
  async scopes(@Context('user') user: Token) {
    return user?.scopes ?? []
  }
}
