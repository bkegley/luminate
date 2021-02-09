import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {AddUserToAccountCommand} from './AddUserToAccountCommand'
import {AccountsRepo, UsersRepo} from '../../../infra/repos'
import {IAddUserToAccountCommandHandler} from './IAddUserToAccountCommandHandler'

@CommandHandler(AddUserToAccountCommand)
export class AddUserToAccountCommandHandler implements IAddUserToAccountCommandHandler {
  constructor(private readonly eventBus: EventBus, private accountsRepo: AccountsRepo, private usersRepo: UsersRepo) {}

  public async execute(command: AddUserToAccountCommand) {
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
      existingUser.events.forEach(event => this.eventBus.publish(event))
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
