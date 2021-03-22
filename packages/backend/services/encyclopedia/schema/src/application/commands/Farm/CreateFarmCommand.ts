import {Token} from '@luminate/mongo-utils'
import {CreateFarmInput} from '../../../types'

export class CreateFarmCommand {
  name: string
  country?: string
  region?: string

  constructor(public user: Token, input: CreateFarmInput) {
    this.name = input.name
    this.country = input.country
    this.region = input.region
  }
}
