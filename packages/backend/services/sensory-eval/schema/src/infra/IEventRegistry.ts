import {AggregateRoot} from '../shared'

export interface IEventRegistry {
  markAggregateForPublish<T>(agg: AggregateRoot<T>): void
  publishEvents(): void
}
