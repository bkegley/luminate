import {DateEntity} from './Date'

describe('DateEntity', () => {
  it('creates a DateEntity when provided a valid input', () => {
    const input = '2020-10-29'
    const dateEntity = DateEntity.create({value: input})
    expect(dateEntity).toBeDefined()
  })

  it('throws when provided an invalid input', () => {
    const input = 'nope'
    expect(() => DateEntity.create({value: input})).toThrow()
  })
})
