import {Entity} from '@luminate/ddd'

export type GrinderBurrSetOption = 'CONICAL_BURR' | 'FLAT_BURR' | 'BLADE'

export interface GrinderBurrSetAttributes {
  value: GrinderBurrSetOption
}

export class GrinderBurrSet extends Entity<GrinderBurrSetAttributes> {
  get value() {
    return this.attrs.value
  }

  public static create(attrs: GrinderBurrSetAttributes) {
    return new GrinderBurrSet(attrs)
  }
}
