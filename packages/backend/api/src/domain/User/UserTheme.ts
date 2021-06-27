import {ValueObject} from '@luminate/ddd'

export enum UserThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export class UserTheme extends ValueObject<UserThemeEnum> {
  public get value() {
    return this.attrs
  }

  public static create(theme: UserThemeEnum) {
    return new UserTheme(theme)
  }
}
