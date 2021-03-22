import {Token} from '@luminate/mongo-utils'
import {UpdateFarmInput} from '../../../types'

export class UpdateFarmCommand {
  name?: string
  country?: string
  region?: string

  constructor(public user: Token, public id: string, input: UpdateFarmInput) {
    this.name = input.name
    this.country = input.country
    this.region = input.region
  }
}
