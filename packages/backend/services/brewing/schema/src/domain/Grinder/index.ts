import {AggregateRoot, EntityId} from '../../shared'
import {GrinderName} from './GrinderName'
import {GrinderDescription} from './GrinderDescription'
import {GrinderCreatedEvent} from './events/GrinderCreatedEvent'
import {GrinderBurrSet} from './GrinderBurrSet'
import {GrinderDeletedEvent} from './events/GrinderDeletedEvent'
import {GrinderUpdatedEvent} from './events'

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
    return this._id.toString()
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
  }

  public update(attrs: Partial<GrinderAttributes>) {
    ;(Object.keys(attrs) as Array<keyof GrinderAttributes>).forEach(key => {
      this.attrs[key] = attrs[key]

      this.markedFields.set(key, attrs[key].value)
    })
    this.registerEvent(new GrinderUpdatedEvent(this))
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
