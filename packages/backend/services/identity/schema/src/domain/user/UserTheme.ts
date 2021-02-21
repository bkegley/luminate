import {ValueObject} from '@luminate/services-shared'

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
