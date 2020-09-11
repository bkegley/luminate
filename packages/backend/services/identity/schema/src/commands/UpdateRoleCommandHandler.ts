import {ICommandHandler, UpdateRoleCommand} from '.'
import {Producer} from 'kafka-node'
import {IRolesAggregate} from '../aggregates'
import {RoleDocument} from '../models'
import {RoleUpdatedEvent} from '../events'

export class UpdateRoleCommandHandler implements ICommandHandler<UpdateRoleCommand, RoleDocument> {
  private producer: Producer
  private rolesAggregate: IRolesAggregate

  constructor(producer: Producer, rolesAggregate: IRolesAggregate) {
    this.producer = producer
    this.rolesAggregate = rolesAggregate
  }

  public async handle(command: UpdateRoleCommand) {
    const existingRole = await this.rolesAggregate.getRole(command.id)

    if (!existingRole) {
      return null
    }

    const updatedRole = Object.assign(
      {},
      ...((Object.keys(command) as unknown) as Array<keyof UpdateRoleCommand>).map(key =>
        command[key] === null || command[key] ? {[key]: command[key]} : null,
      ),
    )

    const roleUpdatedEvent = new RoleUpdatedEvent(updatedRole)

    return new Promise<RoleDocument>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(roleUpdatedEvent), topic: 'roles'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          // @ts-ignore
          resolve({...existingRole, ...updatedRole})
        }
      })
    })
  }
}
