import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {IUpdateRoleCommandHandler, UpdateRoleCommand} from '.'
import {RoleAggregateAttributes} from '../../../domain/Role/Role'
import {RoleScope} from '../../../domain/Role/RoleScope'
import {RoleMapper} from '../../../infra/mappers'
import {RolesRepo} from '../../../infra/repos'

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleCommandHandler implements IUpdateRoleCommandHandler {
  constructor(private eventBus: EventBus, private rolesRepo: RolesRepo) {}

  public async execute(command: UpdateRoleCommand) {
    const existingRoleDocument = await this.rolesRepo.getById(command.id)

    if (!existingRoleDocument) {
      return null
    }

    const existingRole = RoleMapper.toDomain(existingRoleDocument)

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
