import {Producer} from 'kafka-node'
import {CreateRoleCommand, ICommandHandler} from '.'
import {RoleDocument, RoleModel} from '../models'
import {RoleCreatedEvent} from '../events'
import {IRolesAggregate} from '../aggregates'

type CreateRoleResponse = RoleDocument

export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand, CreateRoleResponse> {
  private producer: Producer
  private rolesAggregate: IRolesAggregate

  constructor(producer: Producer, rolesAggregate: IRolesAggregate) {
    this.producer = producer
    this.rolesAggregate = rolesAggregate
  }

  public async handle(command: CreateRoleCommand) {
    const role = new RoleModel({
      name: command.name,
      scopes: command.scopes,
      readAccess: [command.account],
      writeAccess: [command.account],
      adminAccess: [command.account],
    })

    const existingRole = await this.rolesAggregate.getRoleByName(command.name).catch(err => {})

    if (existingRole) {
      throw new Error('Role name taken')
    }

    const roleCreatedEvent = new RoleCreatedEvent(role)

    return new Promise<CreateRoleResponse>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(roleCreatedEvent), topic: 'roles'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(role.toObject({getters: true}))
        }
      })
    })
  }
}
