import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {DeleteAccountCommand} from './DeleteAccountCommand'
import {AccountDeletedEvent} from '../../domain/events'
import {AccountDocument} from '../../infra/models'
import {IAccountsRepo} from '../../infra/repos'

export class DeleteAccountCommandHandler implements ICommandHandler<DeleteAccountCommand, AccountDocument> {
  constructor(private producer: Producer, private accountsRepo: IAccountsRepo) {}

  public async handle(command: DeleteAccountCommand) {
    const {id} = command

    /*
     * Validation
     *
     * This currently couples Command and Query paths
     * One possible solution would be add Consumers on the Command path
     * which would create materialized views solely for validation purposes
     * (e.g. existing account/user names). This would either require data persistence
     * on the Command path (doesn't feel right) or upon startup make a request to the
     * Query path and store necessary validation data in memory.
     */

    const existingAccount = this.accountsRepo.getById(id)

    if (!existingAccount) {
      throw new Error('Account not found')
    }

    const accountDeletedEvent = new AccountDeletedEvent(id)

    return new Promise<AccountDocument>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(accountDeletedEvent), topic: 'accounts'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(existingAccount)
        }
      })
    })
  }
}
