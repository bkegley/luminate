import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {IAccountsAggregate, IUsersAggregate} from '../aggregates'
import {AddUserToAccountCommand} from './AddUserToAccountCommand'
import {UserAddedToAccountEvent} from '../events'

export class AddUserToAccountCommandHandler implements ICommandHandler<AddUserToAccountCommand, boolean> {
  private producer: Producer
  private accountsAggregate: IAccountsAggregate
  private usersAggregate: IUsersAggregate

  constructor(producer: Producer, accountsAggregate: IAccountsAggregate, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.accountsAggregate = accountsAggregate
    this.usersAggregate = usersAggregate
  }

  public async handle(command: AddUserToAccountCommand) {
    const {accountId, userId} = command

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

    const [existingAccount, existingUser] = await Promise.all([
      this.accountsAggregate.getAccount(accountId),
      this.usersAggregate.getUser(userId),
    ])

    if (!existingAccount) {
      throw new Error('Account does not exist')
    }

    if (!existingUser) {
      throw new Error('User does not exist')
    }

    const userAddedToAccountEvent = new UserAddedToAccountEvent(command)

    return new Promise<boolean>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(userAddedToAccountEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}
