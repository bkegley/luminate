// @ts-nocheck
import {Types, Model, QueryFindOneAndUpdateOptions} from 'mongoose'
import {Token} from './types'
import {BaseDocument} from './BaseDocument'
import {IListDocumentsArgs} from './types'
import merge from 'lodash.merge'
import {IService} from './IService'
import {IRepo} from '.'

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

export abstract class AuthenticatedService<T> implements IService<T> {
  constructor(private repo: IRepo<any>) {}

  protected getReadConditionsForUser(user?: Token) {
    return {
      $or: [
        {permissionType: 'public'},
        {
          readAccess: {
            $elemMatch: {
              $in: [user?.account].filter(Boolean),
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: [user?.account].filter(Boolean),
            },
          },
        },
      ],
    }
  }

  protected getWriteConditionsForUser(user?: Token) {
    return {
      $or: [
        {
          writeAccess: {
            $elemMatch: {
              $in: [user?.account].filter(Boolean),
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: [user?.account].filter(Boolean),
            },
          },
        },
      ],
    }
  }

  protected getAdminConditionsForUser(user?: Token) {
    return {
      adminAccess: {
        $elemMatch: {
          $in: [user?.account].filter(Boolean),
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

  public async create(input: any, user?: Token) {
    const defaults = {
      createdByUser: user?.jti,
      createdByAccount: user?.account,
      readAccess: [user?.account].filter(Boolean),
      writeAccess: [user?.account].filter(Boolean),
      adminAccess: [user?.account].filter(Boolean),
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

  //public updateEntityPermissionsForAccount({
  //entityId,
  //accountId,
  //permissions,
  //}: {
  //entityId: string
  //accountId: string
  //permissions: Array<'read' | 'write' | 'admin'>
  //}) {
  //let permissionsObject = {}
  //Object.keys(permissionKeysToPermissionsMap)
  //.map(permission =>
  //(permissions as string[]).includes(permission)
  //? {$addToSet: {[permissionKeysToPermissionsMap[permission]]: Types.ObjectId(accountId)}}
  //: {$pull: {[permissionKeysToPermissionsMap[permission]]: Types.ObjectId(accountId)}},
  //)
  //.forEach(object => (permissionsObject = merge(permissionsObject, object)))

  //return this.model.findOneAndUpdate({_id: entityId, ...this.getAdminConditionsForUser()}, permissionsObject)
  //}
}
