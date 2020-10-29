import {AggregateRoot, EntityId} from '../../shared'
import {DateEntity} from '../Date'
import {BrewingSessionDeletedEvent} from './events/BrewingSessionDeletedEvent'
import {BrewingSessionUpdatedEvent} from './events/BrewingSessionUpdatedEvent'
import {BrewingSessionDescription} from './BrewingSessionDescription'
import {BrewingSessionCreatedEvent} from './events/BrewingSessionCreatedEvent'

export interface BrewingSessionAttributes {
  date?: DateEntity
  description?: BrewingSessionDescription
}

export class BrewingSession extends AggregateRoot<BrewingSessionAttributes> {
  public get id() {
    return this._id.toString()
  }

  public get description() {
    return this.attrs.description
  }

  public get date() {
    return this.attrs.date
  }

  public update(attrs: BrewingSessionAttributes) {
    if (attrs.date) {
      this.attrs.date = attrs.date
      this.markedFields.set('date', attrs.date.value)
    }

    if (attrs.description) {
      this.attrs.description = attrs.description
      this.markedFields.set('description', attrs.description.value)
    }

    this.registerEvent(new BrewingSessionUpdatedEvent(this))
  }

  public delete() {
    this.registerEvent(new BrewingSessionDeletedEvent(this))
  }

  public static create(attrs: BrewingSessionAttributes, id?: EntityId) {
    const brewingSession = new BrewingSession(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof BrewingSessionAttributes>).map(key => {
        brewingSession.markedFields.set(key, attrs[key].value)
      })
      brewingSession.registerEvent(new BrewingSessionCreatedEvent(brewingSession))
    }

    return brewingSession
  }
}
