import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {IUpdateRoleCommandHandler, UpdateRoleCommand} from '.'
import {RoleAggregateAttributes} from '../../../domain/role/Role'
import {RoleScope} from '../../../domain/role/RoleScope'
import {RolesRepo} from '../../../infra/repos'

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleCommandHandler implements IUpdateRoleCommandHandler {
  constructor(private eventBus: EventBus, private rolesRepo: RolesRepo) {}

  public async execute(command: UpdateRoleCommand) {
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
    existingRole.events.forEach(event => this.eventBus.publish(event))
    return existingRole
  }
}
