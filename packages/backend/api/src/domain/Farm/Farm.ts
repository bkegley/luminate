import {AggregateRoot, EntityId} from '@luminate/ddd'

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

  public update(attrs: Partial<FarmAggregateAttributes>) {
    if (attrs.name) {
      this.attrs.name = attrs.name
    }

    if (attrs.countryId) {
      this.attrs.countryId = attrs.countryId
    }

    if (attrs.regionId) {
      this.attrs.regionId
    }

    // TODO: register updated event
  }

  public static create(attrs: FarmAggregateAttributes, id?: EntityId) {
    const isNew = !id
    if (isNew) {
      // TODO: register created event
    }

    return new FarmAggregate(attrs, id)
  }
}
