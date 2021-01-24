import {UpdateUserPasswordCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {IUsersRepo} from '../../infra/repos'
import {UserAggregate} from '../../domain/user/User'

export class UpdateUserPasswordCommandHandler implements ICommandHandler<UpdateUserPasswordCommand, UserAggregate> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: UpdateUserPasswordCommand) {
    const {id, currentPassword, newPassword} = command

    const user = await this.usersRepo.getById(id)

    if (!user || !user.password) {
      throw new Error('There was an error updating your password')
    }

    const isUpdated = user.updatePassword(currentPassword, newPassword)
    if (!isUpdated) {
      throw new Error('There was an error updating your password')
    }

    this.usersRepo.save(user)
    return user
  }
}
