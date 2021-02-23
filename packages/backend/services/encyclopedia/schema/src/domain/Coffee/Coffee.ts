import {AggregateRoot, EntityId} from '@luminate/services-shared'
import {CoffeeName} from './CoffeeName'

export interface CoffeeAggregateAttributes {
  name: CoffeeName
  country?: EntityId
  region?: EntityId
}

export class CoffeeAggregate extends AggregateRoot<CoffeeAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public static create(attrs: CoffeeAggregateAttributes, id?: EntityId) {
    const isNew = !id

    if (isNew) {
      // TODO: register created event
    }

    return new CoffeeAggregate(attrs, id)
  }
}
