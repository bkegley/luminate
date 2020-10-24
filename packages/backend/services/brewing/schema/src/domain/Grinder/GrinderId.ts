import {Entity, EntityId} from '../../shared'

export interface GrinderIdAttributes {
  value: string
}

export class GrinderId extends Entity<EntityId> {
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
    return new GrinderId(id)
  }
}
