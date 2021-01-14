import {IEvent} from '@luminate/services-shared'
import {EventType} from './EventType'

export interface IDomainEvent<T> extends IEvent<EventType, T> {}
