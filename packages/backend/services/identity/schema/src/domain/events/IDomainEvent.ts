import {IEvent} from '@luminate/services-shared'
import {EventType} from '.'

export interface IDomainEvent<T> extends IEvent<EventType, T> {}
