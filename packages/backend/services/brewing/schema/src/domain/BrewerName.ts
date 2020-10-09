import {Entity} from '../shared'

export interface BrewerNameAttributes {
  value: string
}

export class BrewerName extends Entity<BrewerNameAttributes> {
  private constructor(attrs: BrewerNameAttributes) {
    super(attrs)
  }

  get value() {
    return this.attrs.value
  }

  public static create(attrs: BrewerNameAttributes) {
    // Arbitrary validation to test things
    if (attrs.value.length < 5) {
      throw new Error('Name must be longer than 5 chars')
    }

    return new BrewerName(attrs)
  }
}
