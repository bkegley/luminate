import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {SwitchAccountCommand} from './SwitchAccountCommand'
import {AccountSwitchFailedEvent, AccountSwitchedEvent} from '../../domain/account/events'
import jwt from 'jsonwebtoken'
import {IAccountsRepo, IUsersRepo, IRolesRepo} from '../../infra/repos'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

export class SwitchAccountCommandHandler implements ICommandHandler<SwitchAccountCommand, string | null> {
  constructor(
    private producer: Producer,
    private accountsRepo: IAccountsRepo,
    private usersRepo: IUsersRepo,
    private rolesRepo: IRolesRepo,
  ) {}

  public async handle(command: SwitchAccountCommand) {
    const {user: token, accountId} = command

    const user = await this.usersRepo.getById(token.jti)

    const newAccount = user?.accounts.find(account => account.toString() === accountId.toString())

    if (!user || !newAccount) {
      const accountSwitchFailedEvent = new AccountSwitchFailedEvent(user.username.value, accountId)

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

    const [accountRoles, userAccounts] = await Promise.all([
      this.rolesRepo.list({
        id: user.roles.map(role => role.toString()),
        account: command.accountId,
      }),
      this.accountsRepo.list({id: user.accounts}),
    ])

    const accounts = userAccounts.map(account => ({id: account.getEntityId().toString(), name: account.name})) || []
    const account = accounts?.find(account => account.id === newAccount.toString()) || {}

    const roles = accountRoles?.map(role => ({id: role.getEntityId().toString(), name: role.name}))

    const scopes =
      accountRoles.reduce((acc, role) => {
        const scopes = role.scopes
        const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []

    const input = {
      jti: user.getEntityId().toString(),
      sub: user.username,
      accounts,
      account,
      roles,
      scopes,
    }

    const newToken = jwt.sign(input, USER_AUTH_TOKEN, {expiresIn: '10m'})

    const accountSwitchedEvent = new AccountSwitchedEvent(user.username.value, accountId)

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
