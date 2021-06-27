import {MutationAddUserToAccountArgs} from '../../../types'

export class AddUserToAccountCommand {
  accountId: string
  userId: string

  constructor(input: MutationAddUserToAccountArgs) {
    this.accountId = input.accountId
    this.userId = input.userId
  }
}
