import {Token} from '@luminate/mongo-utils'
import {CreateCoffeeInput} from '../../../types'

export class CreateCoffeeCommand {
  name: string
  country?: string
  region?: string

  constructor(public user: Token, input: CreateCoffeeInput) {
    this.name = input.name
    this.country = input.country
    this.region = input.region
  }
}
