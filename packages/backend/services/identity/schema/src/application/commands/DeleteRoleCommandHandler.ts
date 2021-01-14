import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {DeleteRoleCommand} from './DeleteRoleCommand'
import {RoleDeletedEvent} from '../../domain/events'
import {RoleDocument} from '../../infra/models'
import {IRolesRepo} from '../../infra/repos'

export class DeleteRoleCommandHandler implements ICommandHandler<DeleteRoleCommand, RoleDocument> {
  constructor(private producer: Producer, private rolesRepo: IRolesRepo) {}

  public async handle(command: DeleteRoleCommand) {
    const {id} = command

    const existingRole = this.rolesRepo.getById(id)

    if (!existingRole) {
      throw new Error('Role not found')
    }

    const roleDeletedEvent = new RoleDeletedEvent(id)

    return new Promise<RoleDocument>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(roleDeletedEvent), topic: 'roles'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(existingRole)
        }
      })
    })
  }
}
