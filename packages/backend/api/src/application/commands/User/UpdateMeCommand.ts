import {UpdateMeInput} from '../../../types'
import {UserThemeEnum} from '../../../domain/User/UserTheme'

export class UpdateMeCommand {
  id: string
  firstName: string
  lastName: string
  theme: UserThemeEnum

  constructor(id: string, input: UpdateMeInput) {
    this.id = id
    this.firstName = input.firstName
    this.lastName = input.lastName
    this.theme = (input.theme as unknown) as UserThemeEnum
  }
}
