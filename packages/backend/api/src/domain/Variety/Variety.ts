import {AggregateRoot, EntityId} from '@luminate/ddd'

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

  public update(attrs: Partial<VarietyAggregateAttributes>) {
    if (attrs.name) {
      this.attrs.name = attrs.name
    }

    if (attrs.background) {
      this.attrs.background = attrs.background
    }

    // TODO: register updated event
  }

  public static create(attrs: VarietyAggregateAttributes, id?: EntityId) {
    const isNew = !id
    if (isNew) {
      // TODO: register created event
    }

    return new VarietyAggregate(attrs, id)
  }
}
