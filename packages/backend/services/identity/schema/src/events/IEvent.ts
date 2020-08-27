export interface IEvent<T> {
  id: string
  timestamp: string
  event: string
  data: T
}
