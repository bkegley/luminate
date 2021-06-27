import {ValueObject} from '@luminate/ddd'

export class CoffeeName extends ValueObject<string> {
  public get value() {
    return this.attrs
  }

  public static create(name: string) {
    return new CoffeeName(name)
  }
}
