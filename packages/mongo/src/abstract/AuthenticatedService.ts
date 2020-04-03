import mongoose from 'mongoose'
import {BaseService} from './BaseService'
import {Token} from './types'
import {BaseDocument} from './documents'
import {IListDocumentsArgs} from './types'

export class AuthenticatedService<T extends BaseDocument> extends BaseService<T> {
  protected user: Token | null = null

  public loadUser(user: Token | null) {
    this.user = user
  }

  protected getReadConditionsForUser() {
    return {
      $or: [
        {permissionType: 'public'},
        {
          readAccess: {
            $elemMatch: {
              $in: [this.user?.account?.id].filter(Boolean),
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: [this.user?.account?.id].filter(Boolean),
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
              $in: [this.user?.account?.id].filter(Boolean),
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: [this.user?.account?.id].filter(Boolean),
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
          $in: [this.user?.account?.id].filter(Boolean),
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
      createdByAccount: this.user?.account?.id,
      readAccess: [this.user?.account?.id].filter(Boolean),
      writeAccess: [this.user?.account?.id].filter(Boolean),
      adminAccess: [this.user?.account?.id].filter(Boolean),
    }
    return super.create({...defaults, ...input})
  }

  public updateOne(conditions: any, input: any, options?: mongoose.QueryFindOneAndUpdateOptions) {
    return super.updateOne({...conditions, ...this.getReadConditionsForUser()}, input, options)
  }

  public updateById(id: string, input: any, options?: mongoose.QueryFindOneAndUpdateOptions) {
    return this.updateOne({_id: id}, input, options)
  }

  // TODO: delete should remove user's account permissions from the entity instead of deleting
  public deleteById(id: string) {
    return this.model.findOneAndDelete({_id: id, ...this.getWriteConditionsForUser()})
  }
}
