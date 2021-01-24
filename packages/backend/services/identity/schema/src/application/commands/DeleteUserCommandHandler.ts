import {ICommandHandler, DeleteUserCommand} from '.'
import {Producer} from 'kafka-node'
import {IUsersRepo} from '../../infra/repos'

export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, boolean> {
  constructor(private producer: Producer, private usersRepo: IUsersRepo) {}

  public async handle(command: DeleteUserCommand) {
    const {id} = command
    const existingUser = await this.usersRepo.getById(id)

    if (!existingUser) {
      throw new Error('User not found')
    }
    try {
      await this.usersRepo.delete(existingUser.getEntityId().toString())
      return true
    } catch (err) {
      return false
    }
  }
}
