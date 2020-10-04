import {BrewerType} from '../types'

export interface BrewerDTO {
  id: string
  name: string
  description?: string
  type?: BrewerType
}
