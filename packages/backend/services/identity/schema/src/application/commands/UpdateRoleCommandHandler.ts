import {ICommandHandler, UpdateRoleCommand} from '.'
import {Producer} from 'kafka-node'
import {IRolesRepo} from '../../infra/repos'
import {RoleAggregate, RoleAggregateAttributes} from '../../domain/role/Role'
import {RoleScope} from '../../domain/role/RoleScope'

export class UpdateRoleCommandHandler implements ICommandHandler<UpdateRoleCommand, RoleAggregate> {
  constructor(private producer: Producer, private rolesRepo: IRolesRepo) {}

  public async handle(command: UpdateRoleCommand) {
    const existingRole = await this.rolesRepo.getById(command.id)

    if (!existingRole) {
      return null
    }

    let attrs: Partial<RoleAggregateAttributes> = {}
    if (command.name) {
      attrs.name = command.name
    }
    if (command.scopes) {
      attrs.scopes = (command.scopes as unknown) as RoleScope[]
    }

    existingRole.update(attrs)

    this.rolesRepo.save(existingRole)
    return existingRole
  }
}
