import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {UserLoggedOutEvent, LogoutFailedEvent} from '../events'
import {LogoutUserCommand} from './LogoutUserCommand'
import {IUsersRepo} from '../repos'

export class LogoutUserCommandHandler implements ICommandHandler<LogoutUserCommand, boolean> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: LogoutUserCommand) {
    const {username} = command

    // check for existing user
    const user = await this.usersRepo.getByUsername(username)
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
