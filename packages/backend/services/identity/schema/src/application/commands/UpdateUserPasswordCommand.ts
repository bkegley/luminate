import {UpdatePasswordInput} from '../../types'

export class UpdateUserPasswordCommand {
  id: string
  currentPassword: string
  newPassword: string

  constructor(id: string, input: UpdatePasswordInput) {
    this.id = id
    this.currentPassword = input.currentPassword
    this.newPassword = input.newPassword
  }
}
