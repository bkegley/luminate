import {Token} from '@luminate/mongo-utils'

export class RefreshTokenCommand {
  refreshToken: string
  accessToken: Token

  constructor(refreshToken: string, accessToken: Token) {
    this.refreshToken = refreshToken
    this.accessToken = accessToken
  }
}
