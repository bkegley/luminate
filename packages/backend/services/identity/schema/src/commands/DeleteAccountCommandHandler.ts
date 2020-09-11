import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {IAccountsAggregate} from '../aggregates'
import {DeleteAccountCommand} from './DeleteAccountCommand'
import {AccountDeletedEvent} from '../events'
import {AccountDocument} from '../models'

export class DeleteAccountCommandHandler implements ICommandHandler<DeleteAccountCommand, AccountDocument> {
  private producer: Producer
  private accountsAggregate: IAccountsAggregate

  constructor(producer: Producer, accountsAggregate: IAccountsAggregate) {
    this.producer = producer
    this.accountsAggregate = accountsAggregate
  }

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

    const existingAccount = this.accountsAggregate.getAccount(id)

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
