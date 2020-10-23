import {Entity} from '../../shared'

export interface RecipeInstructionsAttributes {
  value: string[]
}

export class RecipeInstructions extends Entity<RecipeInstructionsAttributes> {
  get value() {
    return this.attrs.value
  }

  public static create(attrs: RecipeInstructionsAttributes) {
    return new RecipeInstructions(attrs)
  }
}
