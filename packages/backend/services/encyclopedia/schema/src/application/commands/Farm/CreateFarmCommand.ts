import {CreateFarmInput} from '../../../types'

export class CreateFarmCommand {
  name: string
  country?: string
  region?: string

  constructor(input: CreateFarmInput) {
    this.name = input.name
    this.country = input.country
    this.region = input.region
  }
}
