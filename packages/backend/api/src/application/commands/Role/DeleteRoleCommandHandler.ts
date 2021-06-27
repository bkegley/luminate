import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {DeleteRoleCommand} from './DeleteRoleCommand'
import {IDeleteRoleCommandHandler} from '.'
import {RolesRepo} from '../../../infra/repos'

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleCommandHandler implements IDeleteRoleCommandHandler {
  constructor(private eventBus: EventBus, private rolesRepo: RolesRepo) {}

  public async execute(command: DeleteRoleCommand) {
    const {id} = command

    const existingRole = await this.rolesRepo.getById(id)

    if (!existingRole) {
      throw new Error('Role not found')
    }

    try {
      await this.rolesRepo.delete(existingRole.getEntityId().toString())
      existingRole.events.forEach(event => this.eventBus.publish(event))
      return true
    } catch (err) {
      return false
    }
  }
}
