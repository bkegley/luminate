import {UpdateAccountInput} from '../../../types'

export class UpdateAccountCommand {
  id: string
  name: string

  constructor(id: string, input: UpdateAccountInput) {
    this.id = id
    this.name = input.name
  }
}
