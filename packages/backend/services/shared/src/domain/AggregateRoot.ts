import {Entity} from './Entity'
import {EntityId} from './EntityId'
import {IEvent} from './IEvent'

export abstract class AggregateRoot<T> extends Entity<T> {
  public readonly events: IEvent<any, any>[] = []

  public markedFields = new Map<string, any>()

  protected constructor(attrs: T, id?: EntityId) {
    super(attrs, id)
  }

  public getEntityId() {
    return this._id
  }

  public registerEvent<T, K>(event: IEvent<T, K>) {
    this.events.push(event)
  }
}
