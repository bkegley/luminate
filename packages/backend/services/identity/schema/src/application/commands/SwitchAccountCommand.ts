import {Token} from '@luminate/graphql-utils'

export class SwitchAccountCommand {
  user: Token
  accountId: string

  constructor(user: Token, accountId: string) {
    this.user = user
    this.accountId = accountId
  }
}
