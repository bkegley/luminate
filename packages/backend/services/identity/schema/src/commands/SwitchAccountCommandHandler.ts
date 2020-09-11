import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {SwitchAccountCommand} from './SwitchAccountCommand'
import {AccountSwitchFailedEvent, AccountSwitchedEvent} from '../events'
import jwt from 'jsonwebtoken'
import {IUsersAggregate, IRolesAggregate, IAccountsAggregate} from '../aggregates'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

export class SwitchAccountCommandHandler implements ICommandHandler<SwitchAccountCommand, string | null> {
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

  public async handle(command: SwitchAccountCommand) {
    const {user: token, accountId} = command

    const user = await this.usersAggregate.getUser(token.jti)

    const newAccount = user?.accounts.find(account => account.toString() === accountId.toString())

    if (!user || !newAccount) {
      const accountSwitchFailedEvent = new AccountSwitchFailedEvent(user.username, accountId)

      return new Promise<null>((resolve, reject) => {
        this.producer.send([{messages: JSON.stringify(accountSwitchFailedEvent), topic: 'users'}], (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(null)
          }
        })
      })
    }

    const accountRoles = user.roles.find(role => role.account.toString() === accountId.toString())

    const [userAccounts, userRoles] = await Promise.all([
      this.accountsAggregate.listAccounts({id: user.accounts}),
      this.rolesAggregate.listRoles({id: accountRoles ? accountRoles.roles : []}),
    ])

    const accounts = userAccounts?.map(account => ({id: account.id.toString() as string, name: account.name})) || []
    const account = accounts?.find(account => account.id === newAccount.toString()) || {}

    const roles = userRoles?.map(role => ({id: role.id.toString() as string, name: role.name}))

    const scopes =
      userRoles?.reduce((acc, role) => {
        const scopes = role.scopes
        const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []

    const input = {
      jti: user.id.toString() as string,
      sub: user.username,
      accounts,
      account,
      roles,
      scopes,
    }

    const newToken = jwt.sign(input, USER_AUTH_TOKEN, {expiresIn: '10m'})

    const accountSwitchedEvent = new AccountSwitchedEvent(user.username, accountId)

    return new Promise<string>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(accountSwitchedEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(newToken)
        }
      })
    })
  }
}
