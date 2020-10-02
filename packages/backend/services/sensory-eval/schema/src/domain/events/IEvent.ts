import {EventType} from './EventType'

export interface IEvent<T> {
  timestamp: Date
  event: EventType
  data: T
}
