import {UpdateUserInput} from '../../types'

export class UpdateUserCommand {
  id: string
  username?: string
  firstName?: string
  lastName?: string

  constructor(id: string, input: UpdateUserInput) {
    this.id = id
    this.username = input.username
    this.firstName = input.firstName
    this.lastName = input.lastName
  }
}
