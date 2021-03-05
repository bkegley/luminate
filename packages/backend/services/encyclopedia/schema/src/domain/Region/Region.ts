import {AggregateRoot, EntityId} from '@luminate/services-shared'

export interface RegionAggregateAttributes {
  name: string
  countryId?: EntityId
}

export class RegionAggregate extends AggregateRoot<RegionAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public get countryId() {
    return this.attrs.countryId
  }

  public static create(attrs: RegionAggregateAttributes, id?: EntityId) {
    const isNew = !id
    if (isNew) {
      // TODO: register created event
    }

    return new RegionAggregate(attrs, id)
  }
}
