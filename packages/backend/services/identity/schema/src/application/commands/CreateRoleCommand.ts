import {CreateRoleInput} from '../../types'

export class CreateRoleCommand {
  name: string
  account: string
  scopes?: string[]

  constructor(input: CreateRoleInput & {account: string}) {
    if (!input.account) {
      throw new Error('Account is required')
    }
    this.name = input.name
    this.account = input.account
    this.scopes = input.scopes
  }
}
