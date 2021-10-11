import {IUsersProjection} from './IUsersProjection'
import {KafkaClient, Consumer} from 'kafka-node'
import {UserDocument} from '../../models'
import {IListDocumentsArgs} from '@luminate/mongo-utils'
import {User} from '../../../types'
import {EventType} from '../../../domain/EventType'
import {
  IUserCreatedEvent,
  UserRolesUpdatedEvent,
  UserDeletedEvent,
  UserPasswordUpdatedEvent,
  UserAddedToAccountEvent,
} from '../../../domain/User/events'
import {IUserUpdatedEvent} from '../../../domain/User/events/IUserUpdatedEvent'
import {IUserRolesUpdatedEvent} from '../../../domain/User/events/IUserRolesUpdatedEvent'

export class UsersProjection implements IUsersProjection {
  private client: KafkaClient

  private users: UserDocument[] = []

  constructor() {
    this.client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const usersConsumer = new Consumer(this.client, [{topic: 'users', offset: 0}], {
      fromOffset: true,
    })

    usersConsumer.on('message', message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.USER_CREATED_EVENT: {
          this.userCreatedEventHandler(data)
          break
        }
        case EventType.USER_UPDATED_EVENT: {
          this.userUpdatedEventHandler(data)
          break
        }
        case EventType.USER_ROLES_UPDATED_EVENT: {
          this.userRolesUpdatedEventHandler(data)
          break
        }
        case EventType.USER_DELETED_EVENT: {
          this.userDeletedEventHandler(data)
          break
        }
        case EventType.USER_PASSWORD_UPDATED_EVENT: {
          this.userPasswordUpdatedEventHandler(data)
          break
        }
        case EventType.USER_ADDED_TO_ACCOUNT_EVENT: {
          this.userAddedToAccountEventHandler(data)
          break
        }
      }
    })
  }

  private userCreatedEventHandler(message: IUserCreatedEvent) {
    const {id, ...user} = message.data
    // @ts-ignore
    this.users.push({id, ...user})
  }

  private userUpdatedEventHandler(message: IUserUpdatedEvent) {
    // @ts-ignore -- see TODO
    this.users = this.users.map(user => {
      if (user.id === message.data.id) {
        return {
          // TODO: in-memory objects don't have toObject({getters: true}) method call
          // figure out a shared interface that isn't tied to mongo
          ...user,
          ...message.data,
        }
      }
      return user
    })
  }

  private userRolesUpdatedEventHandler(message: IUserRolesUpdatedEvent) {
    // @ts-ignore -- see TODO
    this.users = this.users.map(user => {
      if (user.id === message.data.id) {
        const {account, roles} = message.data

        return {
          ...user,
          roles: user.roles.map(role => (role.account === account ? {account: account, roles: roles} : role)),
        }
      }
      return user
    })
  }

  private userDeletedEventHandler(message: UserDeletedEvent) {
    this.users = this.users.filter(user => user.id !== message.data.id)
  }

  private userPasswordUpdatedEventHandler(message: UserPasswordUpdatedEvent) {
    // @ts-ignore -- see TODO
    this.users = this.users.map(user =>
      // TODO: in-memory objects don't have toObject({getters: true}) method call
      // figure out a shared interface that isn't tied to mongo
      user.id === message.data.id ? {...user, password: message.data.password} : user,
    )
  }

  private userAddedToAccountEventHandler(message: UserAddedToAccountEvent) {
    const {accountId, userId} = message.data
    // @ts-ignore -- see TODO
    this.users = this.users.map(user => {
      if (user.id === userId) {
        return {
          // TODO: in-memory objects don't have toObject({getters: true}) method call
          // figure out a shared interface that isn't tied to mongo
          ...user,
          accounts: user.accounts.concat(accountId as any),
        }
      }
      return user
    })
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    // TODO: add pagination
    return {
      pageInfo: {
        hasNextPage: false,
        prevCursor: '',
        nextCursor: '',
      },
      // needs to convert accountId in user object to account object either here or in a loader
      edges: this.users.map(user => ({node: (user as unknown) as User, cursor: ''})),
    }
  }

  public async getUser(id: string) {
    return this.users.find(user => user.id === id)
  }

  public async getByUsername(username: string) {
    return this.users.find(user => user.username === username)
  }

  public async listByAccount(accountId: string) {
    return this.users.filter(user => user.accounts.includes(accountId as any))
  }
}
