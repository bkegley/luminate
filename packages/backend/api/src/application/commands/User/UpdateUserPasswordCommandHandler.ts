import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateUserPasswordCommand, IUpdateUserPasswordCommandHandler} from '.'
import {UsersRepo} from '../../../infra/repos'

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordCommandHandler implements IUpdateUserPasswordCommandHandler {
  constructor(private eventBus: EventBus, private usersRepo: UsersRepo) {}

  public async execute(command: UpdateUserPasswordCommand) {
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
    user.events.forEach(event => this.eventBus.publish(event))
    return user
  }
}
