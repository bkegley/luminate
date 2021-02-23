import {CreateCoffeeInput} from '../../../types'

export class CreateCoffeeCommand {
  name: string
  country?: string
  region?: string

  constructor(input: CreateCoffeeInput) {
    this.name = input.name
    this.country = input.country
    this.region = input.region
  }
}
