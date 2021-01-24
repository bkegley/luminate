import {CreateUserInput} from '../../types'

export class CreateUserCommand {
  username: string
  password: string
  account: string
  firstName?: string
  lastName?: string
  roles?: string[]

  constructor(input: CreateUserInput) {
    this.username = input.username
    this.password = input.password
    this.firstName = input.firstName
    this.lastName = input.lastName
    this.roles = input.roles
  }
}
