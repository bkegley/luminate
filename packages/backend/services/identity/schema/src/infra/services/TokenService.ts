import jwt from 'jsonwebtoken'
import {Injectable} from '@nestjs/common'
import {UserAggregate} from '../../domain/user/User'
import {RolesRepo} from '../repos'
import {RefreshTokenAggregate} from '../../domain/refreshToken/RefreshToken'
import {Token} from '@luminate/mongo-utils'

const tokenSecret = process.env.USER_AUTH_TOKEN || 'supersecretpassword'

@Injectable()
export class TokenService {
  constructor(private readonly rolesRepo: RolesRepo) {}

  verifyJwt(authHeader: string) {
    const [bearer, token] = authHeader.split(' ')
    if (bearer !== 'Bearer') {
      return null
    }
    return jwt.verify(token, tokenSecret)
  }

  async createJwt(user: UserAggregate, currentAccessToken?: Token) {
    const account = currentAccessToken?.account?.id || user.defaultAccount.toString()

    const accountRoles = user.roles.find(role => role.account.toString() === account)
    const roles = await this.rolesRepo.list({_id: accountRoles?.roles})

    const scopes =
      roles?.reduce((acc, role) => {
        const scopes = role.scopes
        const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []

    const input = {
      jti: user.getEntityId().toString(),
      sub: user.username.value,
      aud: account,
      scopes,
      theme: user.theme.value,
    }

    return jwt.sign(input, tokenSecret, {expiresIn: '15m'})
  }

  createRefreshToken(user: UserAggregate) {
    return RefreshTokenAggregate.create({userId: user.getEntityId()})
  }
}
