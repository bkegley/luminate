import {IEvent} from '@luminate/ddd'
import {EventType} from './EventType'

export interface IDomainEvent<T> extends IEvent<EventType, T> {}
