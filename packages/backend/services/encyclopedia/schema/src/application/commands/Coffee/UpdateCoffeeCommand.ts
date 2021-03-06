import {UpdateCoffeeInput} from '../../../types'

export class UpdateCoffeeCommand {
  name?: string
  country?: string
  region?: string
  farm?: string
  farmZone?: string
  varieties?: string[]
  elevation?: string
  components?: Array<{
    coffee: string
    percentage: number
  }>

  constructor(public id: string, input: UpdateCoffeeInput) {
    this.name = input.name
    this.country = input.country
    this.region = input.region
    this.farm = input.farm
    this.farmZone = input.farmZone
    this.varieties = input.varieties
    this.elevation = input.elevation
    this.components = input.components
  }
}
