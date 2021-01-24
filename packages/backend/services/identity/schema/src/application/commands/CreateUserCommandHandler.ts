import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {IUsersRepo} from '../../infra/repos'
import {CreateUserCommand} from './CreateUserCommand'
import {UserAggregate} from '../../domain/user/User'
import {UserUsername} from '../../domain/user/UserUsername'
import {UserPassword} from '../../domain/user/UserPassword'
import {EntityId} from '@luminate/services-shared'

export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, UserAggregate> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: CreateUserCommand) {
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

    return user
  }
}
