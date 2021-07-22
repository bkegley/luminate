import {AggregateRoot, EntityId} from '@luminate/ddd'
import {DateEntity} from '../Date'
import {BrewingSessionDeletedEvent} from './events/BrewingSessionDeletedEvent'
import {BrewingSessionUpdatedEvent} from './events/BrewingSessionUpdatedEvent'
import {BrewingSessionDescription} from './BrewingSessionDescription'
import {BrewingSessionCreatedEvent} from './events/BrewingSessionCreatedEvent'

export interface BrewingSessionAttributes {
  date?: DateEntity
  description?: BrewingSessionDescription
  brewGuideId: EntityId
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

  public get brewGuideId() {
    return this.attrs.brewGuideId
  }

  public delete() {
    this.registerEvent(new BrewingSessionDeletedEvent(this))
  }

  public update(attrs: Partial<BrewingSessionAttributes>) {
    ;(Object.keys(attrs) as Array<keyof BrewingSessionAttributes>).forEach(key => {
      // @ts-ignore
      this.attrs[key] = attrs[key]

      this.markedFields.set(key, this.attrs[key].value)
    })

    this.registerEvent(new BrewingSessionUpdatedEvent(this))
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
