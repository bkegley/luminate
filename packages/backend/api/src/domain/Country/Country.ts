import {AggregateRoot, EntityId} from '@luminate/ddd'
import {CountryGeography} from './CountryGeography'
import {CountryPopulation} from './CountryPopulation'

export interface CountryAggregateAttributes {
  name: string
  nameEn?: string
  sovereignId?: string
  population?: CountryPopulation
  geography?: CountryGeography
}

export class CountryAggregate extends AggregateRoot<CountryAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public get nameEn() {
    return this.attrs.nameEn
  }

  public get sovereignId() {
    return this.attrs.sovereignId
  }

  public get population() {
    return this.attrs.population
  }

  public get geography() {
    return this.attrs.geography
  }

  public static create(attrs: CountryAggregateAttributes, id?: EntityId) {
    const isNew = !id
    if (isNew) {
      // TODO: register created event
    }
    return new CountryAggregate(attrs, id)
  }
}
