import {UserAggregate} from './User'
import {UserPassword} from './UserPassword'
import {UserUsername} from './UserUsername'
import {EntityId} from '@luminate/ddd'

describe('UserAggregate', () => {
  it('can be created', () => {
    const user = UserAggregate.create({
      username: UserUsername.create('bkegley'),
      accounts: [EntityId.create()],
      roles: [EntityId.create()],
    })

    expect(user).toBeDefined()
  })

  it('correctly hashes and validates a password', () => {
    const passwordText = 'password1234'
    const password = UserPassword.create({value: passwordText})

    expect(password.getHashedValue).not.toBe(passwordText)
    expect(password.compare(passwordText)).toBeTruthy()
  })
})
