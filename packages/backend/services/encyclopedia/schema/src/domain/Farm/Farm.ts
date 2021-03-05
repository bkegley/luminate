import {AggregateRoot, EntityId} from '@luminate/services-shared'

export interface FarmAggregateAttributes {
  name: string
  countryId?: EntityId
  regionId?: EntityId
}

export class FarmAggregate extends AggregateRoot<FarmAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public get countryId() {
    return this.attrs.countryId
  }

  public get regionId() {
    return this.attrs.regionId
  }

  public static create(attrs: FarmAggregateAttributes, id?: EntityId) {
    const isNew = !id
    if (isNew) {
      // TODO: register created event
    }

    return new FarmAggregate(attrs, id)
  }
}
