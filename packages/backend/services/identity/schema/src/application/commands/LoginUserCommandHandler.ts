import {ICommandHandler} from './ICommandHandler'
import jwt from 'jsonwebtoken'
import {Producer} from 'kafka-node'
import {LoginUserCommand} from './LoginUserCommand'
import {IUsersRepo, IRolesRepo, IAccountsRepo} from '../../infra/repos'

const tokenSecret = process.env.USER_AUTH_TOKEN || 'supersecretpassword'

export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand, string | null> {
  constructor(
    private producer: Producer,
    private usersRepo: IUsersRepo,
    private accountsRepo: IAccountsRepo,
    private rolesRepo: IRolesRepo,
  ) {}

  public async handle(command: LoginUserCommand) {
    const {username, password} = command

    // check for existing user
    const user = await this.usersRepo.getByUsername(username)

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
    return token
  }
}
