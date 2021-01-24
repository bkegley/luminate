import {UpdateUserRolesCommand, ICommandHandler} from '.'
import {Producer} from 'kafka-node'
import {IUsersRepo} from '../../infra/repos'
import {EntityId} from '@luminate/services-shared'
import {UserAggregate} from '../../domain/user/User'

export class UpdateUserRolesCommandHandler implements ICommandHandler<UpdateUserRolesCommand, UserAggregate> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: UpdateUserRolesCommand) {
    const {id, roles, account} = command

    const user = await this.usersRepo.getById(id)

    if (!user) {
      throw new Error('User not found')
    }

    user.update({roles: roles.map(role => EntityId.create(role))})

    this.usersRepo.save(user)
    return user
  }
}
