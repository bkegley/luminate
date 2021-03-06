import {UpdateCoffeeInput} from '../../../types'

export class UpdateCoffeeCommand {
  public name?: string
  public country?: string
  public region?: string
  public farm?: string
  public farmZone?: string
  public varieties?: string[]
  public elevation?: string
  public components?: Array<{
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
