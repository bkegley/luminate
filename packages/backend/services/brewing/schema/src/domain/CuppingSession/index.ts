import {AggregateRoot, EntityId} from '@luminate/services-shared'

export interface CuppingSessionAggregateAttributes {
  internalId?: string
  description?: string
  locked?: boolean
  sessionCoffees?: EntityId[]
  createdAt?: Date
  updatedAt?: Date
}

export class CuppingSessionAggregate extends AggregateRoot<CuppingSessionAggregateAttributes> {
  public get internalId() {
    return this.attrs.internalId
  }

  public get description() {
    return this.attrs.description
  }

  public get createdAt() {
    return this.attrs.createdAt
  }

  public get updatedAt() {
    return this.attrs.updatedAt
  }

  public get locked() {
    return this.attrs.locked
  }

  public update(attrs: Partial<CuppingSessionAggregateAttributes>) {
    this.attrs.updatedAt = new Date()

    if (attrs.description) {
      this.attrs.description = attrs.description
    }

    if (attrs.internalId) {
      this.attrs.internalId = attrs.internalId
    }

    if (attrs.locked) {
      this.attrs.locked = attrs.locked
    }

    if (attrs.sessionCoffees) {
      this.attrs.sessionCoffees = attrs.sessionCoffees
    }
  }

  public delete() {
    // TODO: register a deleted event
  }

  public static create(attrs: CuppingSessionAggregateAttributes, id?: EntityId) {
    return new CuppingSessionAggregate(attrs, id)
  }
}
