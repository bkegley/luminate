export interface IEvent<T, K> {
  timestamp: Date
  event: T
  data: K
}
