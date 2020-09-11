import {UpdateUserRolesCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {IUsersAggregate} from '../aggregates'
import {UserRolesUpdatedEvent} from '../events'

export class UpdateUserRolesCommandHandler implements ICommandHandler<UpdateUserRolesCommand, boolean> {
  private producer: Producer
  private usersAggregate: IUsersAggregate

  constructor(producer: Producer, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.usersAggregate = usersAggregate
  }

  public async handle(command: UpdateUserRolesCommand) {
    const {id, roles, account} = command

    const user = await this.usersAggregate.getUser(id)

    if (!user) return false

    const userRolesUpdatedEvent = new UserRolesUpdatedEvent({id, roles, account})

    const updatedUser = {...user, roles: user.roles.map(role => (role.account === account ? {account, roles} : role))}

    return new Promise<boolean>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(userRolesUpdatedEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          // @ts-ignore
          resolve(updatedUser)
        }
      })
    })
  }
}
