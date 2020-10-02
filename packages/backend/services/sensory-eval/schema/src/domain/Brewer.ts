import {BrewerName} from './BrewerName'
import {AggregateRoot, EntityId} from '../shared'
import {BrewerCreatedEvent, BrewerDeletedEvent, BrewerUpdatedEvent} from './events'

export interface BrewerAttributes {
  name: BrewerName
}

export class Brewer extends AggregateRoot<BrewerAttributes> {
  private constructor(attrs: BrewerAttributes, id?: EntityId) {
    super(attrs, id)
  }

  get id() {
    return this._id.toValue()
  }

  get name() {
    return this.attrs.name
  }

  delete() {
    this.registerEvent(new BrewerDeletedEvent(this.id.toString()))
    return this
  }

  update(attrs: BrewerAttributes) {
    if (attrs.name) {
      this.attrs.name = attrs.name
    }
    this.registerEvent(new BrewerUpdatedEvent(this))
    return this
  }

  public static create(attrs: BrewerAttributes, id?: EntityId) {
    const brewer = new Brewer(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      brewer.registerEvent(new BrewerCreatedEvent(brewer))
    }

    return brewer
  }
}
