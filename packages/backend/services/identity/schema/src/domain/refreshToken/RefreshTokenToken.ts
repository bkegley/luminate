import crypto from 'crypto'
import {ValueObject} from '@luminate/services-shared'

export class RefreshTokenToken extends ValueObject<string> {
  public get value() {
    return this.attrs
  }

  public static create(token?: string) {
    return new RefreshTokenToken(token || crypto.randomBytes(48).toString('hex'))
  }
}
