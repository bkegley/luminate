import {AggregateRoot, EntityId} from '@luminate/services-shared'

export interface VarietyAggregateAttributes {
  name: string
  background?: string
}

export class VarietyAggregate extends AggregateRoot<VarietyAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public get background() {
    return this.attrs.background
  }

  public static create(attrs: VarietyAggregateAttributes, id?: EntityId) {
    const isNew = !id
    if (isNew) {
      // TODO: register created event
    }

    return new VarietyAggregate(attrs, id)
  }
}
