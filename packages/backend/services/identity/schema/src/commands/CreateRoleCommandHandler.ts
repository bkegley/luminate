import {Producer} from 'kafka-node'
import {CreateRoleCommand, ICommandHandler} from '.'
import {RoleDocument, RoleModel} from '../models'
import {RoleCreatedEvent} from '../events'

type CreateRoleResponse = RoleDocument

export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand, CreateRoleResponse> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async handle(command: CreateRoleCommand) {
    const role = new RoleModel(command)

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
