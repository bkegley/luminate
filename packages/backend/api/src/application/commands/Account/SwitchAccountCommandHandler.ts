import jwt from 'jsonwebtoken'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {SwitchAccountCommand, ISwitchAccountCommandHandler} from '.'
import {AccountSwitchedEvent} from '../../../domain/account/events'
import {AccountsRepo, UsersRepo, RolesRepo} from '../../../infra/repos'
import {AccountMapper, UserMapper} from '../../../infra/mappers'

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

    const userDocument = await this.usersRepo.getById(token.jti)

    const newAccountId = userDocument?.accounts.find(account => account.toString() === accountId.toString())

    if (!userDocument || !newAccountId) {
      throw new Error('Unable to switch account')
    }

    const newAccountDocument = this.accountsRepo.getById(String(newAccountId))

    if (!newAccountDocument) {
      throw new Error('Unable to switch account')
    }

    const user = UserMapper.toDomain(userDocument)

    const [accountRoles, userAccounts] = await Promise.all([
      this.rolesRepo.list({
        id: {$in: user.roles.map(role => role.toString())},
        account: command.accountId,
      }),
      this.accountsRepo.list({id: {$in: userDocument.accounts.map(String)}}),
    ])

    const accounts = userAccounts.map(account => ({id: command.accountId, name: account.name})) || []
    const account = accounts?.find(account => account.id === String(newAccountId)) || {}

    const roles = accountRoles?.map(role => ({id: role.id, name: role.name}))

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

    const newToken = jwt.sign(input, USER_AUTH_TOKEN, {expiresIn: '15m'})

    const accountSwitchedEvent = new AccountSwitchedEvent(user.username.value, accountId)

    this.eventBus.publish(accountSwitchedEvent)
    return newToken
  }
}
