import {Entity} from '../../shared'

export enum BrewerTypeEnum {
  POUROVER = 'POUROVER',
  AUTODRIP = 'AUTODRIP',
  FULL_IMMERSION = 'FULL_IMMERSION',
  ESPRESSO = 'ESPRESSO',
}

export interface BrewerTypeAttributes {
  value: BrewerTypeEnum
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
