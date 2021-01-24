import {ValueObject} from '@luminate/services-shared'

export class AccountName extends ValueObject<string> {
  public get value() {
    return this.attrs
  }

  public static create(name: string) {
    return new AccountName(name)
  }
}
