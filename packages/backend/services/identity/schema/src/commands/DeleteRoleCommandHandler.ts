import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {IRolesAggregate} from '../aggregates'
import {DeleteRoleCommand} from './DeleteRoleCommand'
import {RoleDeletedEvent} from '../events'
import {RoleDocument} from '../models'

export class DeleteRoleCommandHandler implements ICommandHandler<DeleteRoleCommand, RoleDocument> {
  private producer: Producer
  private rolesAggregate: IRolesAggregate

  constructor(producer: Producer, rolesAggregate: IRolesAggregate) {
    this.producer = producer
    this.rolesAggregate = rolesAggregate
  }

  public async handle(command: DeleteRoleCommand) {
    const {id} = command

    const existingRole = this.rolesAggregate.getRole(id)

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
