import {Producer} from 'kafka-node'
import {CreateRoleCommand, ICommandHandler} from '.'
import {RoleDocument, RoleAggregateModel} from '../../infra/models'
import {RoleCreatedEvent} from '../../domain/events'

type CreateRoleResponse = RoleDocument

export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand, CreateRoleResponse> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async handle(command: CreateRoleCommand) {
    const existingRole = await RoleAggregateModel.findOne({name: command.name})

    if (existingRole) {
      throw new Error('Role name taken')
    }

    const role = new RoleAggregateModel({
      name: command.name,
      accountId: command.account,
    })

    await role.save()

    const roleCreatedEvent = new RoleCreatedEvent({...role.toObject({getters: true}), scopes: command.scopes})

    return new Promise<CreateRoleResponse>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(roleCreatedEvent), topic: 'roles'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve({...role.toObject({getters: true}), scopes: command.scopes})
        }
      })
    })
  }
}
