import {CommandHandler} from '@nestjs/cqrs'
import {UsersRepo} from '../../../infra/repos'
import {UpdateMeCommand, IUpdateMeCommandHandler} from '.'
import {UserAggregate, UserAggregateAttributes} from '../../../domain/user/User'
import {UserTheme} from '../../../domain/user/UserTheme'

@CommandHandler(UpdateMeCommand)
export class UpdateMeComandHandler implements IUpdateMeCommandHandler {
  constructor(private readonly usersRepo: UsersRepo) {}

  async execute(command: UpdateMeCommand): Promise<UserAggregate> {
    const user = await this.usersRepo.getById(command.id)

    if (!user) {
      throw new Error('User not found!')
    }
    const attrs: Partial<UserAggregateAttributes> = {}

    if (command.theme) {
      attrs.theme = UserTheme.create(command.theme)
    }

    user.update(attrs)

    await this.usersRepo.save(user)

    return user
  }
}
