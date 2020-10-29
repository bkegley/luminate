import {Weight} from './Weight'

describe('Weight', () => {
  it('converts units', () => {
    const weight = Weight.create({amount: 453.592, unit: 'g'})
    expect(weight.kilograms).toBe(0.453592)
    expect(weight.pounds).toBe(1)
    expect(weight.ounces).toBe(16)
  })
})
