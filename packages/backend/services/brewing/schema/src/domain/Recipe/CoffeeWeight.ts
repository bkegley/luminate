import {Entity} from '../../shared'
import {Weight} from '../Weight'

export interface CoffeeWeightAttributes {
  value: Weight
}

export class CoffeeWeight extends Entity<CoffeeWeightAttributes> {
  private constructor(attrs: CoffeeWeightAttributes) {
    super(attrs)
  }

  public get value() {
    return this.attrs.value.value
  }

  public static create(attrs: CoffeeWeightAttributes) {
    return new CoffeeWeight(attrs)
  }
}
