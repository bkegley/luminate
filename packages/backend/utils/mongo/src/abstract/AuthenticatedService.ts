import {Types, Model, QueryFindOneAndUpdateOptions} from 'mongoose'
import {BaseService} from './BaseService'
import {Token} from './types'
import {BaseDocument} from './BaseDocument'
import {IListDocumentsArgs} from './types'
import merge from 'lodash.merge'
import {IService} from './IService'

interface PermissionMap {
  read: string
  write: string
  admin: string
  [x: string]: string
}

const permissionKeysToPermissionsMap: PermissionMap = {
  read: 'readAccess',
  write: 'writeAccess',
  admin: 'adminAccess',
}

export class AuthenticatedService<T extends BaseDocument> extends BaseService<T> implements IService<T> {
  constructor(model: Model<T>, user: Token | null) {
    super(model)
    this.user = user
  }
  protected user: Token | null = null

  protected getReadConditionsForUser() {
    return {
      $or: [
        {permissionType: 'public'},
        {
          readAccess: {
            $elemMatch: {
              $in: [this.user?.account].filter(Boolean),
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: [this.user?.account].filter(Boolean),
            },
          },
        },
      ],
    }
  }

  protected getWriteConditionsForUser() {
    return {
      $or: [
        {
          writeAccess: {
            $elemMatch: {
              $in: [this.user?.account].filter(Boolean),
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: [this.user?.account].filter(Boolean),
            },
          },
        },
      ],
    }
  }

  protected getAdminConditionsForUser() {
    return {
      adminAccess: {
        $elemMatch: {
          $in: [this.user?.account].filter(Boolean),
        },
      },
    }
  }

  protected buildConnectionQuery(args: IListDocumentsArgs) {
    return super.buildConnectionQuery({...args, ...this.getReadConditionsForUser()})
  }

  public async getById(id: string) {
    const document = await this.model.findOne({_id: id, ...this.getReadConditionsForUser()})
    return document
  }

  public async create(input: any) {
    const defaults = {
      createdByUser: this.user?.jti,
      createdByAccount: this.user?.account,
      readAccess: [this.user?.account].filter(Boolean),
      writeAccess: [this.user?.account].filter(Boolean),
      adminAccess: [this.user?.account].filter(Boolean),
    }
    return super.create({...defaults, ...input})
  }

  public updateOne(conditions: any, input: any, options?: QueryFindOneAndUpdateOptions) {
    return super.updateOne({...conditions, ...this.getReadConditionsForUser()}, input, options)
  }

  public updateById(id: string, input: any, options?: QueryFindOneAndUpdateOptions) {
    return this.updateOne({_id: id}, input, options)
  }

  // TODO: delete should remove user's account permissions from the entity instead of deleting
  public async deleteById(id: string) {
    return await this.model.findOneAndDelete({_id: id, ...this.getWriteConditionsForUser()})
  }

  public updateEntityPermissionsForAccount({
    entityId,
    accountId,
    permissions,
  }: {
    entityId: string
    accountId: string
    permissions: Array<'read' | 'write' | 'admin'>
  }) {
    let permissionsObject = {}
    Object.keys(permissionKeysToPermissionsMap)
      .map(permission =>
        (permissions as string[]).includes(permission)
          ? {$addToSet: {[permissionKeysToPermissionsMap[permission]]: Types.ObjectId(accountId)}}
          : {$pull: {[permissionKeysToPermissionsMap[permission]]: Types.ObjectId(accountId)}},
      )
      .forEach(object => (permissionsObject = merge(permissionsObject, object)))

    return this.model.findOneAndUpdate({_id: entityId, ...this.getAdminConditionsForUser()}, permissionsObject)
  }
}
