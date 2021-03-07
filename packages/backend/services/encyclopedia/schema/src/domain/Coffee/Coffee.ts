import {AggregateRoot, EntityId} from '@luminate/services-shared'
import {CoffeeName} from './CoffeeName'

export interface CoffeeAggregateAttributes {
  name: CoffeeName
  countryId?: EntityId
  regionId?: EntityId
  varietyIds?: EntityId[]
  elevation?: number
}

export class CoffeeAggregate extends AggregateRoot<CoffeeAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public get countryId() {
    return this.attrs.countryId
  }

  public get regionId() {
    return this.attrs.regionId
  }

  public get varietyIds() {
    return this.attrs.varietyIds
  }

  public get elevation() {
    return this.attrs.elevation
  }

  public update(attrs: Partial<CoffeeAggregateAttributes>) {
    if (attrs.countryId) {
      this.attrs.countryId = attrs.countryId
    }

    if (attrs.name) {
      this.attrs.name = attrs.name
    }

    if (attrs.regionId) {
      this.attrs.regionId = attrs.regionId
    }

    if (attrs.varietyIds) {
      this.attrs.varietyIds = attrs.varietyIds
    }

    // TODO: register updated event
  }

  public static create(attrs: CoffeeAggregateAttributes, id?: EntityId) {
    const isNew = !id

    if (isNew) {
      // TODO: register created event
    }

    return new CoffeeAggregate(attrs, id)
  }
}
