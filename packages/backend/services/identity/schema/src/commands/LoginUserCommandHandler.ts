import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {IUsersAggregate, IAccountsAggregate, IRolesAggregate} from '../aggregates'
import {LoginUserCommand} from './LoginUserCommand'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {UserLoggedInEvent, LoginFailedEvent} from '../events'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand, boolean | string> {
  private producer: Producer
  private usersAggregate: IUsersAggregate
  private accountsAggregate: IAccountsAggregate
  private rolesAggregate: IRolesAggregate

  constructor(
    producer: Producer,
    usersAggregate: IUsersAggregate,
    accountsAggregate: IAccountsAggregate,
    rolesAggregate: IRolesAggregate,
  ) {
    this.producer = producer
    this.usersAggregate = usersAggregate
    this.accountsAggregate = accountsAggregate
    this.rolesAggregate = rolesAggregate
  }

  public async handle(command: LoginUserCommand) {
    const {username, password} = command

    // check for existing user
    const user = await this.usersAggregate.getByUsername(username)
    if (!user) {
      const loginFailedEvent = new LoginFailedEvent({username, password, reason: 'username does not exist'})

      return new Promise<boolean>((resolve, reject) => {
        this.producer.send([{messages: JSON.stringify(loginFailedEvent), topic: 'users'}], (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(false)
          }
        })
      })
    }

    // check for password match
    const passwordMatches = bcrypt.compareSync(password, user.password)

    if (!passwordMatches) {
      const loginFailedEvent = new LoginFailedEvent({username, password, reason: 'password does not match'})

      return new Promise<boolean>((resolve, reject) => {
        this.producer.send([{messages: JSON.stringify(loginFailedEvent), topic: 'users'}], (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(false)
          }
        })
      })
    }

    // get default account
    const defaultAccount = user.defaultAccount || user.accounts[0]

    if (!defaultAccount) {
      const loginFailedEvent = new LoginFailedEvent({username, password, reason: 'user has no account'})

      return new Promise<boolean>((resolve, reject) => {
        this.producer.send([{messages: JSON.stringify(loginFailedEvent), topic: 'users'}], (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(false)
          }
        })
      })
    }

    const accountRoles = user.roles.find(role => role.account === defaultAccount)

    const [userAccounts, userRoles] = await Promise.all([
      this.accountsAggregate.listAccounts({id: user.accounts}),
      accountRoles ? this.rolesAggregate.listRoles({id: accountRoles.roles}) : [],
    ])

    const accounts = userAccounts?.map(account => ({id: account.id.toString() as string, name: account.name}))
    const account = accounts?.find(account => account.id === defaultAccount.toString())

    const roles = userRoles?.map(role => ({id: role.id.toString() as string, name: role.name}))

    const scopes =
      userRoles?.reduce((acc, role) => {
        const scopes = role.scopes
        const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []

    const input = {
      jti: user.id.toString() as string,
      sub: user.username,
      accounts,
      account,
      roles,
      scopes,
    }

    const token = jwt.sign(input, USER_AUTH_TOKEN, {expiresIn: '10m'})

    const userLoggedInEvent = new UserLoggedInEvent({id: user.id})

    return new Promise<string>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(userLoggedInEvent), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      })
    })
  }
}
