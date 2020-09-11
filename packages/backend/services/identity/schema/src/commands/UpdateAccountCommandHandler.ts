import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {UpdateAccountCommand} from './UpdateAccountCommand'
import {AccountDocument} from '../models'
import {IAccountsAggregate} from '../aggregates'
import {AccountUpdatedEvent} from '../events'

type UpdateAccountCommandResponse = AccountDocument

export class UpdateAccountCommandHandler
  implements ICommandHandler<UpdateAccountCommand, UpdateAccountCommandResponse> {
  private producer: Producer
  private accountsAggregate: IAccountsAggregate

  constructor(producer: Producer, accountsAggregate: IAccountsAggregate) {
    this.producer = producer
    this.accountsAggregate = accountsAggregate
  }

  public async handle(command: UpdateAccountCommand) {
    const {id, name} = command

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

    const [existingAccount, existingAccountName] = await Promise.all([
      this.accountsAggregate.getAccount(id),
      this.accountsAggregate.getAccountByName(name),
    ])

    if (existingAccountName) {
      throw new Error('Account name taken')
    }

    const accountUpdatedEvent = new AccountUpdatedEvent(id, name)

    return new Promise<UpdateAccountCommandResponse>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(accountUpdatedEvent), topic: 'accounts'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          // I believe the loaders will resolve the user objects
          // @ts-ignore - while pulling from memory do not need to call existingAccount.toObject({getters: true})
          resolve({...existingAccount, name})
        }
      })
    })
  }
}
