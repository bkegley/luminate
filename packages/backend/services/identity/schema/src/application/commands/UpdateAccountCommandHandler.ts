import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {UpdateAccountCommand} from './UpdateAccountCommand'
import {IAccountsRepo} from '../../infra/repos'
import {AccountName} from '../../domain/account/AccountName'
import {AccountAggregate} from '../../domain/account/Account'

export class UpdateAccountCommandHandler implements ICommandHandler<UpdateAccountCommand, AccountAggregate> {
  constructor(private producer: Producer, private accountsRepo: IAccountsRepo) {}

  public async handle(command: UpdateAccountCommand) {
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

    return existingAccount
  }
}
