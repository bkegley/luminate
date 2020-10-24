import {Entity} from '../../shared'

export interface RecipeNameAttributes {
  value: string
}

export class RecipeName extends Entity<RecipeNameAttributes> {
  private constructor(attrs: RecipeNameAttributes) {
    super(attrs)
  }

  get value() {
    return this.attrs.value
  }

  public static create(attrs: RecipeNameAttributes) {
    if (attrs.value.length < 3) {
      throw new Error('Name must be longer than 3 characters')
    }
    return new RecipeName(attrs)
  }
}
