import {UpdateUserRolesCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {UserRolesUpdatedEvent} from '../../domain/events'
import {IUsersRepo} from '../../infra/repos'

export class UpdateUserRolesCommandHandler implements ICommandHandler<UpdateUserRolesCommand, boolean> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: UpdateUserRolesCommand) {
    const {id, roles, account} = command

    const user = await this.usersRepo.getById(id)

    if (!user) return false

    const userRolesUpdatedEvent = new UserRolesUpdatedEvent({id, roles, account})

    // TODO: fix this after updating repo return types
    // @ts-ignore
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
