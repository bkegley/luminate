import {ValueObject} from '@luminate/ddd'
import bcrypt from 'bcryptjs'

export interface UserPasswordAttributes {
  value: string
  isHashed?: boolean
}

const saltRounds = 10

export class UserPassword extends ValueObject<UserPasswordAttributes> {
  public getHashedValue() {
    if (this.attrs.isHashed) {
      return this.attrs.value
    }

    return bcrypt.hashSync(this.attrs.value, saltRounds)
  }

  public compare(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.getHashedValue())
  }

  public static create(attrs: UserPasswordAttributes) {
    if (attrs.value.length < 5) {
      throw new Error('Password too short!')
    }

    return new UserPassword(attrs)
  }
}
