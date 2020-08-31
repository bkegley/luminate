import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {CreateAccountWithOwnerCommand} from './CreateAccountWithOwner'
import {IMessage} from './IMessage'
import {AccountDocument, UserDocument, UserModel, AccountModel, RoleModel} from '../models'
import {IAccountsAggregate, IUsersAggregate} from '../aggregates'

type CreateAccountWithOwnerResponse = Account & {users: UserDocument[]}

export class CreateAccountWithOwnerCommandHandler
  implements ICommandHandler<CreateAccountWithOwnerCommand, CreateAccountWithOwnerResponse> {
  private producer: Producer
  private accountsAggregate: IAccountsAggregate
  private usersAggregate: IUsersAggregate

  constructor(producer: Producer, accountsAggregate: IAccountsAggregate, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.accountsAggregate = accountsAggregate
    this.usersAggregate = usersAggregate
  }

  public async handle(command: CreateAccountWithOwnerCommand) {
    const {name, username, password} = command

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

    const [existingAccount, existingUser, ownerRole] = await Promise.all([
      this.accountsAggregate.getAccountByName(name),
      this.usersAggregate.getByUsername(username),
      RoleModel.findOne({name: 'Owner'}),
    ])

    if (existingAccount) {
      throw new Error('Account name taken')
    }
    if (existingUser) {
      throw new Error('Username taken')
    }

    if (!ownerRole) {
      throw new Error('Owner role does not exist')
    }

    const account = new AccountModel({name})
    const owner = new UserModel({
      username,
      password,
      roles: [
        {
          account: account.id,
          roles: [ownerRole?.id].filter(Boolean),
        },
      ],
      accounts: [account.id],
      readAccess: [account.id],
      writeAccess: [account.id],
      adminAccess: [account.id],
      type: ['user'],
    })

    console.log({account: JSON.stringify(account.toObject()), owner: JSON.stringify(owner.toObject())})
    const now = new Date()

    const accountMessage: IMessage<AccountDocument> = {
      timestamp: now,
      event: 'AccountCreatedEvent',
      data: account,
    }

    const userMessage: IMessage<UserDocument> = {
      timestamp: now,
      event: 'UserCreatedEvent',
      data: owner,
    }

    return new Promise<CreateAccountWithOwnerResponse>((resolve, reject) => {
      this.producer.send(
        [
          {messages: JSON.stringify(accountMessage), topic: 'accounts'},
          {messages: JSON.stringify(userMessage), topic: 'users'},
        ],
        (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve({...account.toObject({getters: true}), users: [owner]})
          }
        },
      )
    })
  }
}
