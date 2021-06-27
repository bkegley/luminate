import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateUserRolesCommand, IUpdateUserRolesCommandHandler} from '.'
import {EntityId} from '@luminate/ddd'
import {UsersRepo} from '../../../infra/repos'

@CommandHandler(UpdateUserRolesCommand)
export class UpdateUserRolesCommandHandler implements IUpdateUserRolesCommandHandler {
  constructor(private eventBus: EventBus, private usersRepo: UsersRepo) {}

  public async execute(command: UpdateUserRolesCommand) {
    const {id, roles, account} = command

    const user = await this.usersRepo.getById(id)

    if (!user) {
      throw new Error('User not found')
    }

    user.updateRoles({account: EntityId.create(account), roles: roles.map(role => EntityId.create(role))})

    this.usersRepo.save(user)

    user.events.forEach(event => this.eventBus.publish(event))
    return user
  }
}
