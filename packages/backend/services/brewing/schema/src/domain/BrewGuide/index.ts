import {AggregateRoot, EntityId} from '../../shared'
import {BrewGuideName} from './BrewGuideName'
import {BrewGuideCreatedEvent} from './events/BrewGuideCreatedEvent'
import {BrewGuideUpdatedEvent} from './events/BrewGuideUpdatedEvent'
import {BrewGuideDeletedEvent} from './events/BrewGuideDeletedEvent'
import {RecipeId} from '../Recipe/RecipeId'
import {BrewGuideInstructions} from './BrewGuideInstructions'
import {BrewGuideOverview} from './BrewGuideOverview'

export interface BrewGuideAttributes {
  name: BrewGuideName
  overview?: BrewGuideOverview
  recipeId: RecipeId
  instructions?: BrewGuideInstructions
}

export class BrewGuide extends AggregateRoot<BrewGuideAttributes> {
  public get id() {
    return this._id.toString()
  }

  public get name() {
    return this.attrs.name
  }

  public get overview() {
    return this.attrs.overview
  }

  public get recipeId() {
    return this.attrs.recipeId
  }

  public get instructions() {
    return this.attrs.instructions
  }

  public update(attrs: Partial<BrewGuideAttributes>) {
    ;(Object.keys(attrs) as Array<keyof Partial<BrewGuideAttributes>>).map(key => {
      // TODO: possibly fix this
      // @ts-ignore
      this.attrs[key] = attrs[key]
      this.markedFields.set(key, this.attrs[key])
    })

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
