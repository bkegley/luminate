import {BrewerType} from '../../types'

export interface IBrewerDTO {
  id: string
  name: string
  description?: string
  type?: BrewerType
}
