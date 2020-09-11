import {UpdateUserCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {UserDocument} from '../models'
import {IUsersAggregate} from '../aggregates'
import {UserUpdatedEvent} from '../events'

export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, UserDocument> {
  private producer: Producer
  private usersAggregate: IUsersAggregate

  constructor(producer: Producer, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.usersAggregate = usersAggregate
  }

  public async handle(command: UpdateUserCommand) {
    const {id, ...remainingUserFields} = command
    /*
     * Validation
     *
     * This currently couples Command and Query paths
     * One possible solution would be add Consumers on the Command path
     * which would create materialized views solely for validation purposes
     * (e.g. existing account/user names). This would either require data persistence
     * on the Command path (doesn't feel right) or upon startup make a request to the
     * Query path and store necessary validation data in memory.
     */

    const existingUser = await this.usersAggregate.getUser(command.id)

    if (!existingUser) {
      throw new Error('User not found')
    }

    // @ts-ignore
    const userUpdatedEvent = new UserUpdatedEvent({id, ...remainingUserFields})

    const returnUser = Object.assign(
      existingUser,
      ((Object.keys(remainingUserFields) as unknown) as Array<keyof typeof remainingUserFields>)
        .filter(key => remainingUserFields[key] !== null)
        .map(key => ({[key]: remainingUserFields[key]})),
    )

    return new Promise<UserDocument>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(userUpdatedEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          // @ts-ignore - while pulling from memory do not need to call existingAccount.toObject({getters: true})
          resolve(returnUser)
        }
      })
    })
  }
}