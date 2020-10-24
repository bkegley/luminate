import {AggregateRoot, EntityId} from '../../shared'
import {RecipeName} from './RecipeName'
import {RecipeInstructions} from './RecipeInstructions'
import {GrinderGrindSetting} from './GrinderGrindSetting'
import {RecipeDeletedEvent, RecipeUpdatedEvent, RecipeCreatedEvent} from './events'
import {BrewerId} from '../Brewer/BrewerId'
import {GrinderId} from '../Grinder/GrinderId'

export interface RecipeAttributes {
  name: RecipeName
  grinderId: GrinderId
  grindSetting?: GrinderGrindSetting
  brewerId: BrewerId
  instructions?: RecipeInstructions
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

  get instructions() {
    return this.attrs.instructions
  }

  public delete() {
    this.registerEvent(new RecipeDeletedEvent(this))
    return this
  }

  public update(attrs: Partial<RecipeAttributes>) {
    if (attrs.name) {
      this.attrs.name = attrs.name
      this.markedFields.set('name', this.attrs.name.value)
    }

    if (attrs.brewerId) {
      this.attrs.brewerId = attrs.brewerId
      this.markedFields.set('brewerId', this.attrs.brewerId.id.toString())
    }

    if (attrs.grinderId) {
      this.attrs.grinderId = attrs.grinderId
      this.markedFields.set('grinderId', this.attrs.grinderId.id.toString())
    }

    if (attrs.grindSetting) {
      this.attrs.grindSetting = attrs.grindSetting
      this.markedFields.set('grindSetting', this.attrs.grindSetting.value)
    }

    if (attrs.instructions) {
      this.attrs.instructions = attrs.instructions
      this.markedFields.set('instructions', this.attrs.instructions.value)
    }

    this.registerEvent(new RecipeUpdatedEvent(this))
    return this
  }
  public static create(attrs: RecipeAttributes, id?: EntityId) {
    // handle validation here
    if (!attrs.grinderId) {
      throw new Error('Grinder required')
    }

    if (!attrs.brewerId) {
      throw new Error('Brewer required')
    }

    const recipe = new Recipe(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof RecipeAttributes>).map(key => {
        recipe.markedFields.set(key, recipe.attrs[key].value)
      })
      recipe.registerEvent(new RecipeCreatedEvent(recipe))
    }

    return recipe
  }
}