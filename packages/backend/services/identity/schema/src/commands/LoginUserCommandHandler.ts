import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {LoginUserCommand} from './LoginUserCommand'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {UserLoggedInEvent, LoginFailedEvent} from '../events'
import {IUsersRepo, IRolesRepo, IAccountsRepo} from '../repos'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand, boolean | string> {
  constructor(
    private producer: Producer,
    private usersRepo: IUsersRepo,
    private accountsRepo: IAccountsRepo,
    private rolesRepo: IRolesRepo,
  ) {}

  public async handle(command: LoginUserCommand) {
    const {username, password} = command

    // check for existing user
    const user = await this.usersRepo.getByUsername(username)
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

    // TODO: fix this after fixing repo return types
    // @ts-ignore
    const accountRoles = user.roles.find(role => role.account === defaultAccount)

    const [userAccounts, userRoles] = await Promise.all([
      this.accountsRepo.list({id: user.accounts}),
      accountRoles ? this.rolesRepo.list({id: accountRoles.roles}) : [],
    ])

    // TODO: fix this after fixing repo return types
    // @ts-ignore
    const accounts = userAccounts?.map(account => ({id: account.id.toString() as string, name: account.name}))
    // TODO: fix this after fixing repo return types
    // @ts-ignore
    const account = accounts?.find(account => account.id === defaultAccount.toString())

    // TODO: fix this after fixing repo return types
    // @ts-ignore
    const roles = userRoles?.map(role => ({id: role.id.toString() as string, name: role.name}))

    const scopes =
      // TODO: fix this after fixing repo return types
      // @ts-ignore
      userRoles?.reduce((acc, role) => {
        const scopes = role.scopes
        // TODO: fix this after fixing repo return types
        // @ts-ignore
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
