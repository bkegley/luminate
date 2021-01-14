import {Entity} from '@luminate/services-shared'

export interface RecipeNoteAttributes {
  value: string
}

export class RecipeNote extends Entity<RecipeNoteAttributes> {
  get value() {
    return this.attrs.value
  }

  public static create(attrs: RecipeNoteAttributes) {
    return new RecipeNote(attrs)
  }
}
