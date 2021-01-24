import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {AddUserToAccountCommand} from './AddUserToAccountCommand'
import {IAccountsRepo, IUsersRepo} from '../../infra/repos'

export class AddUserToAccountCommandHandler implements ICommandHandler<AddUserToAccountCommand, boolean> {
  constructor(private producer: Producer, private accountsRepo: IAccountsRepo, private usersRepo: IUsersRepo) {}

  public async handle(command: AddUserToAccountCommand) {
    const {accountId, userId} = command

    const [existingAccount, existingUser] = await Promise.all([
      this.accountsRepo.getById(accountId),
      this.usersRepo.getById(userId),
    ])

    if (!existingAccount) {
      throw new Error('Account does not exist')
    }

    if (!existingUser) {
      throw new Error('User does not exist')
    }

    existingUser.addAccount(existingAccount.getEntityId())

    try {
      await this.usersRepo.save(existingUser)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
