import {Producer} from 'kafka-node'
import {CreateAccountWithOwnerCommand, ICommandHandler} from '.'
import {IEvent, EventType} from '../events'
import {AccountDocument, UserDocument, UserModel, AccountModel} from '../models'
import {IAccountsAggregate, IUsersAggregate, IRolesAggregate} from '../aggregates'
import bcrypt from 'bcryptjs'

const saltRounds = 10

type CreateAccountWithOwnerResponse = AccountDocument & {users: UserDocument[]}

export class CreateAccountWithOwnerCommandHandler
  implements ICommandHandler<CreateAccountWithOwnerCommand, CreateAccountWithOwnerResponse> {
  private producer: Producer
  private accountsAggregate: IAccountsAggregate
  private usersAggregate: IUsersAggregate
  private rolesAggregate: IRolesAggregate

  constructor(
    producer: Producer,
    accountsAggregate: IAccountsAggregate,
    usersAggregate: IUsersAggregate,
    rolesAggregate: IRolesAggregate,
  ) {
    this.producer = producer
    this.accountsAggregate = accountsAggregate
    this.usersAggregate = usersAggregate
    this.rolesAggregate = rolesAggregate
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
      this.rolesAggregate.getRoleByName('Owner'),
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

    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const account = new AccountModel({name})
    const owner = new UserModel({
      username,
      password: hashedPassword,
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

    const now = new Date()

    const accountCreatedEvent: IEvent<AccountDocument> = {
      timestamp: now,
      event: EventType.ACCOUNT_CREATED_EVENT,
      data: account,
    }

    const userCreatedEvent: IEvent<UserDocument> = {
      timestamp: now,
      event: EventType.USER_CREATED_EVENT,
      data: owner,
    }

    return new Promise<CreateAccountWithOwnerResponse>((resolve, reject) => {
      this.producer.send(
        [
          {messages: JSON.stringify(accountCreatedEvent), topic: 'accounts'},
          {messages: JSON.stringify(userCreatedEvent), topic: 'users'},
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
