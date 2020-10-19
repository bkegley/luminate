import {AggregateRoot, EntityId} from '../../shared'
import {GrinderName} from './GrinderName'
import {GrinderDescription} from './GrinderDescription'
import {GrinderCreatedEvent} from './events/GrinderCreatedEvent'
import {GrinderBurrSet} from './GrinderBurrSet'
import {GrinderDeletedEvent} from './events/GrinderDeletedEvent'

export interface GrinderAttributes {
  name: GrinderName
  description?: GrinderDescription
  burrSet?: GrinderBurrSet
}

export class Grinder extends AggregateRoot<any> {
  private constructor(attrs: GrinderAttributes, id?: EntityId) {
    super(attrs, id)
  }

  get id() {
    return this._id.toValue()
  }

  get name() {
    return this.attrs.name
  }

  get description() {
    return this.attrs.description
  }

  get burrSet() {
    return this.attrs.burrSet
  }

  public delete() {
    this.registerEvent(new GrinderDeletedEvent(this.id.toString()))
    return this
  }

  public update(attrs: GrinderAttributes) {
    if (attrs.name) {
      this.attrs.name = attrs.name
      this.markedFields.set('name', this.attrs.name.value)
    }

    if (attrs.description) {
      this.attrs.description = attrs.description
      this.markedFields.set('description', this.attrs.description.value)
    }

    if (attrs.burrSet) {
      this.attrs.burrSet = attrs.burrSet
      this.markedFields.set('burrSet', this.attrs.burrSet.value)
    }
  }

  public static create(attrs: GrinderAttributes, id?: EntityId) {
    const grinder = new Grinder(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof typeof attrs>).forEach(key => {
        grinder.markedFields.set(key, attrs[key].value)
      })
      grinder.registerEvent(new GrinderCreatedEvent(grinder))
    }

    return grinder
  }
}
