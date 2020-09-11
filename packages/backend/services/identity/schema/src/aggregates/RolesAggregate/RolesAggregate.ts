import {KafkaClient, Consumer} from 'kafka-node'
import {RoleDocument, RoleModel} from '../../models'
import {QueryListRolesArgs, Role} from '../../types'
import {IRolesAggregate} from './IRolesAggregate'
import {ScopeOperations, ScopeResources} from '@luminate/mongo-utils'
import {EventType, RoleUpdatedEvent, RoleDeletedEvent, RoleCreatedEvent} from '../../events'

export class RolesAggregete implements IRolesAggregate {
  private client: KafkaClient
  private roles: RoleDocument[] = []

  constructor() {
    this.client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const scopes = Object.values(ScopeOperations)
      .map(operation => {
        return Object.values(ScopeResources).map(resource => `${operation}:${resource}`)
      })
      .reduce((acc, arr) => acc.concat(arr), [])

    // seed the db with owner role
    // TODO: this should probably happen as a command on server startup
    const ownerRole = new RoleModel({name: 'Owner', scopes, permissionType: 'public'})
    this.roles.push({...ownerRole.toObject({getters: true})})

    const rolesConsumer = new Consumer(this.client, [{topic: 'roles', offset: 0}], {
      fromOffset: true,
    })

    rolesConsumer.on('message', message => {
      const data = JSON.parse(message.value as string)
      switch (data.event) {
        case EventType.ROLE_CREATED_EVENT: {
          this.roleCreatedEventHandler(data)
          break
        }
        case EventType.ROLE_UPDATED_EVENT: {
          this.roleUpdatedEventHandler(data)
          break
        }
        case EventType.ROLE_DELETED_EVENT: {
          this.roleDeletedEventHandler(data)
          break
        }
        default: {
          break
        }
      }
    })
  }

  private roleCreatedEventHandler(data: RoleCreatedEvent) {
    const {_id, ...role} = data.data
    // @ts-ignore
    this.roles.push({id: _id, ...role})
  }

  private roleUpdatedEventHandler(data: RoleUpdatedEvent) {
    // @ts-ignore
    this.roles = this.roles.map(role => {
      if (role.id === data.data.id) {
        return {...role, ...data.data}
      }
      return role
    })
  }

  private roleDeletedEventHandler(data: RoleDeletedEvent) {
    this.roles = this.roles.filter(role => role.id !== data.data.id)
  }

  public async getConnectionResults(args: QueryListRolesArgs) {
    return {
      pageInfo: {
        hasNextPage: false,
        prevCursor: '',
        nextCursor: '',
      },
      edges: this.roles.map(role => ({node: (role as unknown) as Role, cursor: ''})),
    }
  }

  public async listRoles(args?: any) {
    // TODO: add use cases outside of filtering on id(s)
    if (!args) {
      return this.roles
    }

    const roles = this.roles.filter(role =>
      Array.isArray(args.id) ? args.id.includes(role.id.toString()) : args.id === role.id.toString(),
    )

    return roles
  }

  public async getRole(id: string) {
    return new Promise<RoleDocument>((resolve, reject) => {
      const role = this.roles.find(role => role.id === id)
      if (role) {
        resolve(role)
      } else {
        reject('Role not found')
      }
    })
  }

  public async getRoleByName(name: string) {
    return new Promise<RoleDocument>((resolve, reject) => {
      const role = this.roles.find(role => role.name === name)
      if (role) {
        resolve(role)
      } else {
        reject('Role not found')
      }
    })
  }
}
