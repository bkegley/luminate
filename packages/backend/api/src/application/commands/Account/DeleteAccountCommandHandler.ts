import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {IDeleteAccountCommandHandler} from '.'
import {DeleteAccountCommand} from './DeleteAccountCommand'
import {AccountsRepo} from '../../../infra/repos'

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountCommandHandler implements IDeleteAccountCommandHandler {
  constructor(private eventBus: EventBus, private accountsRepo: AccountsRepo) {}

  public async execute(command: DeleteAccountCommand) {
    const {id} = command
    const account = await this.accountsRepo.getById(id)

    if (!account) {
      throw new Error('Account not found')
    }

    try {
      this.accountsRepo.delete(account.getEntityId().toString())
      account.events.forEach(event => this.eventBus.publish(event))
      return true
    } catch (err) {
      return false
    }
  }
}
