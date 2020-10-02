import {Entity} from './Entity'
import {EntityId} from './EntityId'
import {IEvent} from '../domain/events'

export abstract class AggregateRoot<T> extends Entity<T> {
  public readonly events: IEvent<any>[] = []

  protected constructor(attrs: T, id?: EntityId) {
    super(attrs, id)
  }

  public getEntityId() {
    return this._id
  }

  public registerEvent<K>(event: IEvent<K>) {
    this.events.push(event)
  }
}
