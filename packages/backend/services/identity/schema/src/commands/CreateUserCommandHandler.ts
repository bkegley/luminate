import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {IUsersAggregate} from '../aggregates'
import {UserDocument, UserModel} from '../models'
import {CreateUserCommand} from './CreateUserCommand'
import {UserCreatedEvent} from '../events'
import bcrypt from 'bcryptjs'

const saltRounds = 10

export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, UserDocument> {
  private producer: Producer
  private usersAggregate: IUsersAggregate

  constructor(producer: Producer, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.usersAggregate = usersAggregate
  }

  public async handle(command: CreateUserCommand) {
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

    const existingUser = await this.usersAggregate.getByUsername(command.username)

    if (existingUser) {
      throw new Error('Username already exists')
    }
    const {password, ...remainingUserFields} = command
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const user = new UserModel({pasword: hashedPassword, ...remainingUserFields})

    const userCreatedEvent = new UserCreatedEvent(user)

    return new Promise<UserDocument>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(userCreatedEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(user)
        }
      })
    })
  }
}
