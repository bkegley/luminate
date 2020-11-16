import {Entity, EntityId} from '../shared'

export interface DateAttributes {
  value: Date
}

export interface DateInput {
  value: string
}

export class DateEntity extends Entity<DateAttributes> {
  public get value() {
    return this.attrs.value.toString()
  }

  public isFuture() {
    return this.attrs.value.getTime() > new Date().getTime()
  }

  public static create(attrs: DateInput, id?: EntityId) {
    if (isNaN(Date.parse(attrs.value))) {
      throw new Error('Provide a valid date')
    }

    const date = new Date(attrs.value)
    return new DateEntity({value: date}, id)
  }
}
