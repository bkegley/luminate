import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {UpdateAccountCommand} from './UpdateAccountCommand'
import {AccountName} from '../../../domain/account/AccountName'
import {IUpdateAccountCommandHandler} from '.'
import {AccountsRepo} from '../../../infra/repos'

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountCommandHandler implements IUpdateAccountCommandHandler {
  constructor(private eventBus: EventBus, private accountsRepo: AccountsRepo) {}

  public async execute(command: UpdateAccountCommand) {
    const {id, name} = command

    const [existingAccount, existingAccountName] = await Promise.all([
      this.accountsRepo.getById(id),
      this.accountsRepo.getByName(name),
    ])

    if (existingAccountName) {
      throw new Error('Account name taken')
    }

    const accountName = AccountName.create(name)

    existingAccount.update({name: accountName})

    this.accountsRepo.save(existingAccount)

    existingAccount.events.forEach(event => this.eventBus.publish(event))

    return existingAccount
  }
}
