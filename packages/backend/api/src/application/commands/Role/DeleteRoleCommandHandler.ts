import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {DeleteRoleCommand} from './DeleteRoleCommand'
import {IDeleteRoleCommandHandler} from '.'
import {RolesRepo} from '../../../infra/repos'
import {RoleMapper} from '../../../infra/mappers'

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleCommandHandler implements IDeleteRoleCommandHandler {
  constructor(private eventBus: EventBus, private rolesRepo: RolesRepo) {}

  public async execute(command: DeleteRoleCommand) {
    const {id} = command

    const existingRoleDocument = await this.rolesRepo.getById(id)

    if (!existingRoleDocument) {
      throw new Error('Role not found')
    }

    const existingRole = RoleMapper.toDomain(existingRoleDocument)

    try {
      await this.rolesRepo.delete(existingRole.getEntityId().toString())
      existingRole.events.forEach(event => this.eventBus.publish(event))
      return true
    } catch (err) {
      return false
    }
  }
}
