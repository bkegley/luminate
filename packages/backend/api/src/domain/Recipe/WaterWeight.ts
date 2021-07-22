import {Entity} from '@luminate/ddd'
import {Weight} from '../Weight'

export interface WaterWeightAttributes {
  value: Weight
}

export class WaterWeight extends Entity<WaterWeightAttributes> {
  private constructor(attrs: WaterWeightAttributes) {
    super(attrs)
  }

  public get value() {
    return this.attrs.value.value
  }

  public static create(attrs: WaterWeightAttributes) {
    return new WaterWeight(attrs)
  }
}
