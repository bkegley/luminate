import {Brewer, Grinder} from '../../../types'

export interface CreateRecipeDTO {
  id: string
  name: string
  brewer: Brewer
  grinder: Grinder
  grindSetting?: number
  note?: string
}
