import jwt from 'jsonwebtoken'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {SwitchAccountCommand, ISwitchAccountCommandHandler} from '.'
import {AccountSwitchFailedEvent, AccountSwitchedEvent} from '../../../domain/account/events'
import {AccountsRepo, UsersRepo, RolesRepo} from '../../../infra/repos'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

@CommandHandler(SwitchAccountCommand)
export class SwitchAccountCommandHandler implements ISwitchAccountCommandHandler {
  constructor(
    private eventBus: EventBus,
    private accountsRepo: AccountsRepo,
    private usersRepo: UsersRepo,
    private rolesRepo: RolesRepo,
  ) {}

  public async execute(command: SwitchAccountCommand) {
    const {user: token, accountId} = command

    const user = await this.usersRepo.getById(token.jti)

    const newAccount = user?.accounts.find(account => account.toString() === accountId.toString())

    if (!user || !newAccount) {
      const accountSwitchFailedEvent = new AccountSwitchFailedEvent(user.username.value, accountId)
      this.eventBus.publish(accountSwitchFailedEvent)
      return null
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

    this.eventBus.publish(accountSwitchedEvent)
    return newToken
  }
}
