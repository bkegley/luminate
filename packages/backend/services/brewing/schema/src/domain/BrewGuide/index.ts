import {AggregateRoot, EntityId} from '../../shared'
import {BrewGuideName} from './BrewGuideName'
import {BrewGuideCreatedEvent} from './events/BrewGuideCreatedEvent'
import {BrewGuideUpdatedEvent} from './events/BrewGuideUpdatedEvent'
import {BrewGuideDeletedEvent} from './events/BrewGuideDeletedEvent'

export interface BrewGuideAttributes {
  name: BrewGuideName
}

export class BrewGuide extends AggregateRoot<BrewGuideAttributes> {
  public get id() {
    return this._id.toString()
  }

  public get name() {
    return this.attrs.name
  }

  public update(attrs: Partial<BrewGuideAttributes>) {
    if (attrs.name) {
      this.attrs.name = attrs.name
      this.markedFields.set('name', this.attrs.name)
    }
    this.registerEvent(new BrewGuideUpdatedEvent(this))
  }

  public delete() {
    this.registerEvent(new BrewGuideDeletedEvent(this))
  }

  public static create(attrs: BrewGuideAttributes, id?: EntityId) {
    const brewGuide = new BrewGuide(attrs)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof BrewGuideAttributes>).map(key => {
        brewGuide.markedFields.set(key, attrs[key].value)
      })
      brewGuide.registerEvent(new BrewGuideCreatedEvent(brewGuide))
    }

    return brewGuide
  }
}
