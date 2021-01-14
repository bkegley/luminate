import {UpdateUserPasswordCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {UserPasswordUpdatedEvent} from '../events'
import bcrypt from 'bcryptjs'
import {IUsersRepo} from '../repos'

const saltRounds = 10

export class UpdateUserPasswordCommandHandler implements ICommandHandler<UpdateUserPasswordCommand, boolean> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: UpdateUserPasswordCommand) {
    const {id, currentPassword, newPassword} = command

    const user = await this.usersRepo.getById(id)

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
