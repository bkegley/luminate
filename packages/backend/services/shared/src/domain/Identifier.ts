export class Identifier<T> {
  constructor(private _value: T) {}

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false
    }

    if (!(id instanceof this.constructor)) {
      return false
    }

    return id.toValue() === this._value
  }

  toString() {
    return String(this._value)
  }

  toValue() {
    return this._value
  }
}
