export interface IEvent<T> {
  timestamp: Date
  event: string
  data: T
}
