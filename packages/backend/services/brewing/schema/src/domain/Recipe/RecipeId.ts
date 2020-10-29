import {EntityId, Entity} from '../../shared'

export class RecipeId extends Entity<EntityId> {
  private constructor(id?: EntityId) {
    super(id)
  }

  get id() {
    return this._id
  }

  get value() {
    return this._id.toString()
  }

  public static create(id?: EntityId) {
    return new RecipeId(id)
  }
}
