import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {DeleteUserCommand, IDeleteUserCommandHandler} from '.'
import {UserMapper} from '../../../infra/mappers'
import {UsersRepo} from '../../../infra/repos'

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements IDeleteUserCommandHandler {
  constructor(private eventBus: EventBus, private usersRepo: UsersRepo) {}

  public async execute(command: DeleteUserCommand) {
    const {id} = command
    const existingUserDocument = await this.usersRepo.getById(id)

    if (!existingUserDocument) {
      throw new Error('User not found')
    }

    const existingUser = UserMapper.toDomain(existingUserDocument)

    try {
      await this.usersRepo.delete(existingUser.getEntityId().toString())
      existingUser.events.forEach(event => this.eventBus.publish(event))
      return true
    } catch (err) {
      return false
    }
  }
}
