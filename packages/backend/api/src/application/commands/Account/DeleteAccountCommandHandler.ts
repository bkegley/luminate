import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {IDeleteAccountCommandHandler} from '.'
import {DeleteAccountCommand} from './DeleteAccountCommand'
import {AccountsRepo} from '../../../infra/repos'
import {AccountMapper} from '../../../infra/mappers'

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountCommandHandler implements IDeleteAccountCommandHandler {
  constructor(private eventBus: EventBus, private accountsRepo: AccountsRepo) {}

  public async execute(command: DeleteAccountCommand) {
    const {id} = command
    const accountDocument = await this.accountsRepo.getById(id)

    if (!accountDocument) {
      throw new Error('Account not found')
    }

    const account = AccountMapper.toDomain(accountDocument)

    try {
      this.accountsRepo.delete(account.getEntityId().toString())
      account.events.forEach(event => this.eventBus.publish(event))
      return true
    } catch (err) {
      return false
    }
  }
}
