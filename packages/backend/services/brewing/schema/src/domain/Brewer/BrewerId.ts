import {Entity, EntityId} from '../../shared'

export interface BrewerIdAttributes {
  value: string
}

export class BrewerId extends Entity<EntityId> {
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
    return new BrewerId(id)
  }
}
