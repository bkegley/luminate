import {BrewerName} from './BrewerName'
import {AggregateRoot, EntityId} from '../../shared'
import {BrewerCreatedEvent, BrewerDeletedEvent, BrewerUpdatedEvent} from './events'
import {BrewerType} from './BrewerType'
import {BrewerDescription} from './BrewerDescription'

export interface BrewerAttributes {
  name: BrewerName
  description?: BrewerDescription
  type?: BrewerType
}

export class Brewer extends AggregateRoot<BrewerAttributes> {
  private constructor(attrs: BrewerAttributes, id?: EntityId) {
    super(attrs, id)
  }

  get id() {
    return this._id.toString()
  }

  get name() {
    return this.attrs.name
  }

  get description() {
    return this.attrs.description
  }

  get type() {
    return this.attrs.type
  }

  delete() {
    this.registerEvent(new BrewerDeletedEvent(this.id.toString()))
    return this
  }

  update(attrs: BrewerAttributes) {
    if (attrs.name) {
      this.attrs.name = attrs.name
      this.markedFields.set('name', this.attrs.name.value)
    }

    if (attrs.description) {
      this.attrs.description = attrs.description
      this.markedFields.set('description', this.attrs.description.value)
    }

    if (attrs.type) {
      this.attrs.type = attrs.type
      this.markedFields.set('type', this.attrs.type.value)
    }

    this.registerEvent(new BrewerUpdatedEvent(this))
    return this
  }

  public static create(attrs: BrewerAttributes, id?: EntityId) {
    const brewer = new Brewer(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof typeof attrs>).forEach(key => {
        brewer.markedFields.set(key, attrs[key].value)
      })
      brewer.registerEvent(new BrewerCreatedEvent(brewer))
    }

    return brewer
  }
}
