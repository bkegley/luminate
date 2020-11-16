import {Brewer, Grinder} from '../../types'

export interface CreateRecipeDTO {
  name: string
  brewer: Brewer
  grinder: Grinder
  grindSetting?: number
  note?: string
}
