import {ValueObject} from '@luminate/services-shared'

export interface CountryPopulationAttributes {
  estimate: number
  rank: number
  year: number
}
export class CountryPopulation extends ValueObject<CountryPopulationAttributes> {
  public get estimate() {
    return this.attrs.estimate
  }

  public get rank() {
    return this.attrs.rank
  }

  public get year() {
    return this.attrs.year
  }

  public static create(attrs: CountryPopulationAttributes) {
    return new CountryPopulation(attrs)
  }
}
