import {AggregateRoot, EntityId} from '../../shared'
import {RecipeName} from './RecipeName'
import {GrinderGrindSetting} from './GrinderGrindSetting'
import {RecipeDeletedEvent, RecipeUpdatedEvent, RecipeCreatedEvent} from './events'
import {CoffeeWeight} from './CoffeeWeight'
import {WaterWeight} from './WaterWeight'
import {RecipeNote} from './RecipeNote'

export interface RecipeAttributes {
  name: RecipeName
  grinderId: EntityId
  grindSetting?: GrinderGrindSetting
  brewerId: EntityId
  coffeeWeight: CoffeeWeight
  waterWeight: WaterWeight
  note?: RecipeNote
}

export class Recipe extends AggregateRoot<RecipeAttributes> {
  private constructor(attrs: RecipeAttributes, id?: EntityId) {
    super(attrs, id)
  }

  get id() {
    return this._id.toString()
  }

  get name() {
    return this.attrs.name
  }

  get grinderId() {
    return this.attrs.grinderId
  }

  get grindSetting() {
    return this.attrs.grindSetting
  }

  get brewerId() {
    return this.attrs.brewerId
  }

  get note() {
    return this.attrs.note
  }

  public delete() {
    this.registerEvent(new RecipeDeletedEvent(this))
  }

  public update(attrs: Partial<RecipeAttributes>) {
    ;(Object.keys(attrs) as Array<keyof RecipeAttributes>).forEach(key => {
      // @ts-ignore
      this.attrs[key] = attrs[key]

      if (key === 'brewerId' || key === 'grinderId') {
        this.markedFields.set(key, this.attrs[key].toString())
      } else {
        this.markedFields.set(key, this.attrs[key].value)
      }
    })

    this.registerEvent(new RecipeUpdatedEvent(this))
  }
  public static create(attrs: RecipeAttributes, id?: EntityId) {
    const recipe = new Recipe(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof RecipeAttributes>).map(key => {
        if (key === 'brewerId' || key === 'grinderId') {
          recipe.markedFields.set(key, recipe.attrs[key].toString())
        } else {
          recipe.markedFields.set(key, recipe.attrs[key].value)
        }
      })
      recipe.registerEvent(new RecipeCreatedEvent(recipe))
    }

    return recipe
  }
}
