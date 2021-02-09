import {CreateAccountInput} from '../../../types'

export class CreateAccountWithOwnerCommand {
  name: string
  username: string
  password: string

  constructor(input: CreateAccountInput) {
    this.name = input.name
    this.username = input.username
    this.password = input.password
  }
}
