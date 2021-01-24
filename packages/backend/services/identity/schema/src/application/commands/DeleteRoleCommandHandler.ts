import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {DeleteRoleCommand} from './DeleteRoleCommand'
import {IRolesRepo} from '../../infra/repos'

export class DeleteRoleCommandHandler implements ICommandHandler<DeleteRoleCommand, boolean> {
  constructor(private producer: Producer, private rolesRepo: IRolesRepo) {}

  public async handle(command: DeleteRoleCommand) {
    const {id} = command

    const existingRole = await this.rolesRepo.getById(id)

    if (!existingRole) {
      throw new Error('Role not found')
    }

    try {
      await this.rolesRepo.delete(existingRole.getEntityId().toString())
      return true
    } catch (err) {
      return false
    }
  }
}
