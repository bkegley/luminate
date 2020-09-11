import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {IUsersAggregate} from '../aggregates'
import {UserLoggedOutEvent, LogoutFailedEvent} from '../events'
import {LogoutUserCommand} from './LogoutUserCommand'

export class LogoutUserCommandHandler implements ICommandHandler<LogoutUserCommand, boolean> {
  private producer: Producer
  private usersAggregate: IUsersAggregate

  constructor(producer: Producer, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.usersAggregate = usersAggregate
  }

  public async handle(command: LogoutUserCommand) {
    const {username} = command

    // check for existing user
    const user = await this.usersAggregate.getByUsername(username)
    if (!user) {
      const logoutFailedEvent = new LogoutFailedEvent(username)

      return new Promise<boolean>((resolve, reject) => {
        this.producer.send([{messages: JSON.stringify(logoutFailedEvent), topic: 'users'}], (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(false)
          }
        })
      })
    }
    const userLoggedOutEvent = new UserLoggedOutEvent(username)

    return new Promise<boolean>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(userLoggedOutEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(false)
        }
      })
    })
  }
}
