import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {CreateRoleCommand, UpdateRoleCommand, DeleteRoleCommand} from '../commands'
import {CreateRoleInput, UpdateRoleInput} from '../../types'
import {RoleMapper} from '../../infra/mappers/RoleMapper'
import {GetRoleQuery, ListRolesQuery} from '../queries/Role'
import {Token} from '@luminate/mongo-utils'

@Resolver('Role')
export class RoleResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listRoles')
  async listRoles() {
    const query = new ListRolesQuery()
    return this.queryBus.execute(query)
  }

  @Query('getRole')
  async getRoles(@Args('id') id: string) {
    const query = new GetRoleQuery(id)
    const role = await this.queryBus.execute(query)
    return RoleMapper.toDTO(role)
  }

  @Mutation('createRole')
  async createRole(@Args('input') input: CreateRoleInput, @Context('user') user: Token) {
    const command = new CreateRoleCommand({...input, account: user.account.id})
    const role = await this.commandBus.execute(command)
    return RoleMapper.toDTO(role)
  }

  @Mutation('updateRole')
  async updateRole(@Args('id') id: string, @Args('input') input: UpdateRoleInput) {
    const command = new UpdateRoleCommand(id, input)
    const role = await this.commandBus.execute(command)
    return RoleMapper.toDTO(role)
  }

  @Mutation('deleteRole')
  async deleteRole(@Args('id') id: string) {
    const command = new DeleteRoleCommand(id)
    return this.commandBus.execute(command)
  }
}
