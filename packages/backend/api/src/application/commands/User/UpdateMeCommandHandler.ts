import {CommandHandler} from '@nestjs/cqrs'
import {UsersRepo} from '../../../infra/repos'
import {UpdateMeCommand, IUpdateMeCommandHandler} from '.'
import {UserAggregate, UserAggregateAttributes} from '../../../domain/User/User'
import {UserTheme} from '../../../domain/User/UserTheme'
import {UserMapper} from '../../../infra/mappers'

@CommandHandler(UpdateMeCommand)
export class UpdateMeComandHandler implements IUpdateMeCommandHandler {
  constructor(private readonly usersRepo: UsersRepo) {}

  async execute(command: UpdateMeCommand): Promise<UserAggregate> {
    const userDocument = await this.usersRepo.getById(command.id)

    if (!userDocument) {
      throw new Error('User not found!')
    }

    const user = UserMapper.toDomain(userDocument)
    const attrs: Partial<UserAggregateAttributes> = {}

    if (command.theme) {
      attrs.theme = UserTheme.create(command.theme)
    }

    user.update(attrs)

    await this.usersRepo.save(user)

    return user
  }
}
