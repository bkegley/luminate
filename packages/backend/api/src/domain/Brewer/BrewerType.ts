import {Entity} from '@luminate/ddd'

export type BrewerTypeOption = 'AUTODRIP' | 'FULL_IMMERSION' | 'POUROVER' | 'ESPRESSO'

export interface BrewerTypeAttributes {
  value: BrewerTypeOption
}

export class BrewerType extends Entity<BrewerTypeAttributes> {
  private constructor(attrs: BrewerTypeAttributes) {
    super(attrs)
  }

  get value() {
    return this.attrs.value
  }

  public static create(attrs: BrewerTypeAttributes) {
    return new BrewerType(attrs)
  }
}
