import {UpdateUserPasswordCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {IUsersAggregate} from '../aggregates'
import {UserPasswordUpdatedEvent} from '../events'
import bcrypt from 'bcryptjs'

const saltRounds = 10

export class UpdateUserPasswordCommandHandler implements ICommandHandler<UpdateUserPasswordCommand, boolean> {
  private producer: Producer
  private usersAggregate: IUsersAggregate

  constructor(producer: Producer, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.usersAggregate = usersAggregate
  }

  public async handle(command: UpdateUserPasswordCommand) {
    const {id, currentPassword, newPassword} = command

    const user = await this.usersAggregate.getUser(id)

    if (!user || !user.password) return false

    const currentPasswordMatches = await bcrypt.compare(currentPassword, user.password)

    if (!currentPasswordMatches) return false

    const newHashedPassword = bcrypt.hashSync(newPassword, saltRounds)
    const userPasswordUpdatedEvent = new UserPasswordUpdatedEvent({id, password: newHashedPassword})

    return new Promise<boolean>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(userPasswordUpdatedEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}
