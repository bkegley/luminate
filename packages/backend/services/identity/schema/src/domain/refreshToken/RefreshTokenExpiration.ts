import {ValueObject} from '@luminate/services-shared'

export class RefreshTokenExpiration extends ValueObject<Date> {
  public get value() {
    return this.attrs
  }

  public static create(date?: Date) {
    return new RefreshTokenExpiration(date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  }
}
