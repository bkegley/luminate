import {Entity} from '@luminate/services-shared'

export interface WeightInput {
  amount: number
  unit: 'g' | 'oz'
}

export interface WeightAttributes {
  grams: number
  ounces: number
}

const gramsPerPound = 453.592

const toGrams = (input: {amount: WeightInput['amount']; unit: 'oz'}) => {
  return {
    amount: input.amount * 16 * gramsPerPound,
    unit: 'g',
  }
}

export class Weight extends Entity<WeightAttributes> {
  private constructor(attrs: WeightAttributes) {
    super(attrs)
  }

  public get value() {
    return this.grams
  }

  public get grams() {
    return this.attrs.grams
  }

  public get kilograms() {
    return this.attrs.grams / 1000
  }

  public get ounces() {
    return this.attrs.ounces
  }

  public get pounds() {
    return this.attrs.ounces / 16
  }

  public static create(input: WeightInput) {
    const gramInput = input.unit === 'oz' ? toGrams(input as {amount: number; unit: 'oz'}) : input
    const attrs: WeightAttributes = {
      grams: gramInput.amount,
      ounces: (gramInput.amount / gramsPerPound) * 16,
    }

    return new Weight(attrs)
  }
}
