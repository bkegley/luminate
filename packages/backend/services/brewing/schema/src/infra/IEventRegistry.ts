import {AggregateRoot} from '@luminate/services-shared'

export interface IEventRegistry {
  markAggregateForPublish<T>(agg: AggregateRoot<T>): void
  publishEvents(): void
}
