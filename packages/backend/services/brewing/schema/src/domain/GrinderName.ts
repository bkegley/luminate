import {Entity} from '../shared'

export interface GrinderNameAttributes {
  value: string
}

export class GrinderName extends Entity<GrinderNameAttributes> {
  get value() {
    return this.attrs.value
  }

  public static create(attrs: GrinderNameAttributes) {
    // This is just a test
    if (attrs.value.length < 5) {
      throw new Error('Grinder name must be longer than 5 chars')
    }

    return new GrinderName(attrs)
  }
}
