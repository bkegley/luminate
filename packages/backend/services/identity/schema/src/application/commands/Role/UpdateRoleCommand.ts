import {UpdateRoleInput} from '../../../types'

export class UpdateRoleCommand {
  id: string
  name: string
  scopes: string[]

  constructor(id: string, input: UpdateRoleInput) {
    this.id = id
    this.name = input.name
    this.scopes = input.scopes
  }
}
