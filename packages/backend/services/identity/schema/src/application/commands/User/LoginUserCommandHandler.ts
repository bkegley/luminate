import jwt from 'jsonwebtoken'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {LoginUserCommand} from './LoginUserCommand'
import {ILoginUserCommandHandler} from '.'
import {AccountsRepo, RolesRepo, UsersRepo} from '../../../infra/repos'

const tokenSecret = process.env.USER_AUTH_TOKEN || 'supersecretpassword'

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ILoginUserCommandHandler {
  constructor(
    private eventBus: EventBus,
    private usersRepo: UsersRepo,
    private accountsRepo: AccountsRepo,
    private rolesRepo: RolesRepo,
  ) {}

  public async execute(command: LoginUserCommand) {
    const {username, password} = command

    // check for existing user
    const user = await this.usersRepo.getByUsername(username)

    if (!user) {
      return null
    }

    const matches = user.comparePassword(password)

    if (!matches) {
      return null
    }

    const defaultAccount = user.defaultAccount

    const userRoles = await this.rolesRepo.list({_id: user.roles.map(role => role.toString())})
    const accountRoles = userRoles.filter(role => role.account.toString() === defaultAccount.toString())

    const scopes =
      accountRoles?.reduce((acc, role) => {
        const scopes = role.scopes
        const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []

    const input = {
      jti: user.getEntityId().toString(),
      sub: user.username.value,
      aud: user.defaultAccount.toString(),
      scopes,
    }

    const token = jwt.sign(input, tokenSecret, {expiresIn: '10m'})

    user.events.forEach(event => this.eventBus.publish(event))
    return token
  }
}
