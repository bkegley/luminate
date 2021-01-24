import {UpdateUserCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {IUsersRepo} from '../../infra/repos'
import {UserUsername} from '../../domain/user/UserUsername'
import {UserAggregate} from '../../domain/user/User'

export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, UserAggregate> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: UpdateUserCommand) {
    const {id, ...remainingUserFields} = command
    const existingUser = await this.usersRepo.getById(command.id)

    if (!existingUser) {
      throw new Error('User not found')
    }

    const username = UserUsername.create(command.username)
    existingUser.update({username})

    await this.usersRepo.save(existingUser)

    return existingUser
  }
}
