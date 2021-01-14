import {BrewerName} from './BrewerName'
import {AggregateRoot, EntityId} from '@luminate/services-shared'
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
    this.registerEvent(new BrewerDeletedEvent(this))
  }

  public update(attrs: Partial<BrewerAttributes>) {
    ;(Object.keys(attrs) as Array<keyof Partial<BrewerAttributes>>).forEach(key => {
      // @ts-ignore
      this.attrs[key] = attrs[key]

      if (attrs[key]) {
        this.markedFields.set(key, this.attrs[key].value)
      }
    })

    this.registerEvent(new BrewerUpdatedEvent(this))
  }

  public static create(attrs: BrewerAttributes, id?: EntityId) {
    const brewer = new Brewer(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof BrewerAttributes>).forEach(key => {
        if (attrs[key]) {
          brewer.markedFields.set(key, attrs[key].value)
        }
      })
      brewer.registerEvent(new BrewerCreatedEvent(brewer))
    }

    return brewer
  }
}
