export interface IMessage<T> {
  event: string
  timestamp: Date
  data: T
}
