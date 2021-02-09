import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateUserCommand, IUpdateUserCommandHandler} from '.'
import {UserUsername} from '../../../domain/user/UserUsername'
import {UsersRepo} from '../../../infra/repos'

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements IUpdateUserCommandHandler {
  constructor(private eventBus: EventBus, private usersRepo: UsersRepo) {}

  public async execute(command: UpdateUserCommand) {
    const {id, ...remainingUserFields} = command
    const existingUser = await this.usersRepo.getById(command.id)

    if (!existingUser) {
      throw new Error('User not found')
    }

    const username = UserUsername.create(command.username)
    existingUser.update({username})

    await this.usersRepo.save(existingUser)

    existingUser.events.forEach(event => this.eventBus.publish(event))

    return existingUser
  }
}
