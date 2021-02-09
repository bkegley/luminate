import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {EntityId} from '@luminate/services-shared'
import {CreateUserCommand} from './CreateUserCommand'
import {UserAggregate} from '../../../domain/user/User'
import {UserUsername} from '../../../domain/user/UserUsername'
import {UserPassword} from '../../../domain/user/UserPassword'
import {ICreateUserCommandHandler} from '.'
import {UsersRepo} from '../../../infra/repos'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICreateUserCommandHandler {
  constructor(private eventBus: EventBus, private usersRepo: UsersRepo) {}

  public async execute(command: CreateUserCommand) {
    const existingUser = await this.usersRepo.getByUsername(command.username)

    if (existingUser) {
      throw new Error('Username already exists')
    }

    const user = UserAggregate.create({
      username: UserUsername.create(command.username),
      password: UserPassword.create({value: command.password}),
      accounts: [EntityId.create(command.account)],
      roles: command.roles?.map(role => EntityId.create(role)) || [],
    })

    await this.usersRepo.save(user)

    user.events.forEach(event => this.eventBus.publish(event))

    return user
  }
}
