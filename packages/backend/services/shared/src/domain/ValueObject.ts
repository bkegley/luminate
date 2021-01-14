export abstract class ValueObject<T> {
  protected constructor(public readonly attrs: T) {}
}
