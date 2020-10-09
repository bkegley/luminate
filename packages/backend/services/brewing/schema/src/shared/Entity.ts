import {EntityId} from './EntityId'

export abstract class Entity<T> {
  protected readonly _id: EntityId
  public readonly attrs: T

  constructor(attrs: T, id?: EntityId) {
    this._id = id ? id : EntityId.create()
    this.attrs = attrs
  }

  public equals(entity?: Entity<T>) {
    if (!entity) {
      return false
    }

    if (this === entity) {
      return true
    }

    return this._id.equals(entity._id)
  }
}
