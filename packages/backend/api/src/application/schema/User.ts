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
import {UserMapper} from '../../infra/mappers'
import {ListUsersQuery, GetUserQuery} from '../queries'
import {ScopeGuard, Scopes} from '../guards'
import {UserDocument} from '../../infra/models'
import {AccountsRepo, RolesRepo} from '../../infra/repos'

@UseGuards(ScopeGuard)
@Resolver('User')
export class UserResolvers {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly accountsRepo: AccountsRepo,
    private readonly rolesRepo: RolesRepo,
  ) {}

  @Query('listUsers')
  async listUsers() {
    const query = new ListUsersQuery()
    return this.queryBus.execute(query)
  }

  @Scopes('read:user')
  @Query('getUser')
  async getUser(@Args('id') id: string) {
    const query = new GetUserQuery(id)
    const user = await this.queryBus.execute(query)

    return UserMapper.toDTO(user)
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput) {
    const command = new CreateUserCommand(input)
    const user = await this.commandBus.execute(command)

    return UserMapper.toDTO(user)
  }

  @Mutation('updateUser')
  async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
    const command = new UpdateUserCommand(id, input)
    const user = await this.commandBus.execute(command)

    return UserMapper.toDTO(user)
  }

  @Mutation('updateMe')
  async updateMe(@Args('input') input: UpdateMeInput, @Context('user') token: Token) {
    const command = new UpdateMeCommand(token.jti, input)
    const user = await this.commandBus.execute(command)

    return UserMapper.toDTO(user)
  }

  @Mutation('updateUserRoles')
  async updateUserRoles(@Args('id') id: string, @Args('roles') roles: string[], @Context('user') token: Token) {
    const command = new UpdateUserRolesCommand({id, roles, account: token.account.id})
    const user = await this.commandBus.execute(command)
    return UserMapper.toDTO(user)
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: string) {
    const command = new DeleteUserCommand(id)
    return this.commandBus.execute(command)
  }

  @ResolveField()
  async accounts(@Parent() parent: UserDocument) {
    return this.accountsRepo.list({id: {$in: parent.accounts.map(String)}})
  }

  @ResolveField()
  async roles(@Parent() parent: UserDocument, @Context('user') user: Token) {
    const accountRoles = parent.roles?.filter(role => role.account === user.account?.id)

    if (!accountRoles?.length) {
      return []
    }

    const roleIds = accountRoles.reduce((acc, role) => acc.concat(role.roles.map(String)), [] as string[])
    return this.rolesRepo.list({id: {$in: roleIds}})
  }

  @ResolveField()
  async scopes(@Parent() parent: UserDocument, @Context('user') user: Token) {
    const accountRoles = parent.roles?.filter(role => role.account === user.account?.id)

    if (!accountRoles?.length) {
      return []
    }

    const roleIds = accountRoles.reduce((acc, role) => acc.concat(role.roles.map(String)), [] as string[])
    const roles = await this.rolesRepo.list({id: {$in: roleIds}})

    return (
      roles?.reduce((acc, role) => {
        const newScopes = role.scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []
    )
  }
}
