import {AggregateRoot, EntityId} from '@luminate/ddd'

export interface ViewAggregateAttributes {
  name: string
  description?: string
  jsonString?: string
}

export class ViewAggregate extends AggregateRoot<ViewAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public get description() {
    return this.attrs.description
  }

  public get jsonString() {
    return this.attrs.jsonString
  }

  public update(attrs: Partial<ViewAggregateAttributes>) {
    if (attrs.name) {
      this.attrs.name = attrs.name
    }

    if (attrs.description) {
      this.attrs.description = attrs.description
    }

    if (attrs.jsonString) {
      this.attrs.jsonString = attrs.jsonString
    }

    // TODO: register updated event
  }

  public static create(attrs: ViewAggregateAttributes, id?: EntityId) {
    const isNew = !id

    if (isNew) {
      // TODO: register created event
    }

    return new ViewAggregate(attrs, id)
  }
}
