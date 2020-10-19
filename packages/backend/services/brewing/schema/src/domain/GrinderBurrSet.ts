import {Entity} from '../shared'

export enum GrinderBurrSetEnum {
  CONICAL_BURR = 'CONICAL_BURR',
  FLAT_BURR = 'FLAT_BURR',
  BLADE = 'BLADE',
}

export interface GrinderBurrSetAttributes {
  value: GrinderBurrSetEnum
}

export class GrinderBurrSet extends Entity<GrinderBurrSetAttributes> {
  get value() {
    return this.attrs.value
  }

  public static create(attrs: GrinderBurrSetAttributes) {
    return new GrinderBurrSet(attrs)
  }
}
