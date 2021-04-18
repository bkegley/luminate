import {Model} from 'mongoose'
// FIX: types broken on current mongoose
// @ts-ignore
import {FilterQuery} from 'mongoose'
import {Token} from './types'
import {IListDocumentsArgs} from './types'
import {BaseRepo} from './BaseRepo'
import {AuthenticatedDocument} from './AuthenticatedDocument'
import {IAuthenticatedRepo} from './IAuthenticatedRepo'

export abstract class AuthenticatedRepo<T extends AuthenticatedDocument>
  extends BaseRepo<T>
  implements IAuthenticatedRepo<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  protected getReadConditionsForUser(user: Token) {
    return {
      $or: [
        {permissionType: 'public' as 'public' | 'private'},
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

  protected getWriteConditionsForUser(user: Token) {
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

  protected getAdminConditionsForUser(user: Token) {
    return {
      adminAccess: {
        $elemMatch: {
          $in: [user?.account].filter(Boolean),
        },
      },
    }
  }

  getConnectionResults(user: Token, args?: IListDocumentsArgs): Promise<any>
  getConnectionResults(args: IListDocumentsArgs): Promise<any>
  public async getConnectionResults(userOrArgs: IListDocumentsArgs | Token, args?: IListDocumentsArgs) {
    // check if user
    if (args || 'jti' in userOrArgs) {
      return super.getConnectionResults({...args, ...this.getReadConditionsForUser(userOrArgs as Token)})
    }

    return super.getConnectionResults(userOrArgs)
  }

  getById(id: string): Promise<T>
  getById(user: Token, id: string): Promise<T>
  public async getById(idOrUser: any, id?: string) {
    if (id) {
      // @ts-ignore
      const filter: FilterQuery<T> = {
        $and: [{_id: id}, this.getReadConditionsForUser(idOrUser)],
      }

      return this.model.findOne(filter)
    }
    throw new Error('Must be authenticated')
  }

  create(user: Token, input: any): Promise<T>
  create(input: any): Promise<T>
  public async create(userOrInput: Token | any, input?: any) {
    if (!input) {
      return super.create(userOrInput)
    }
    const user: Token = userOrInput

    const defaults = {
      createdByUser: user.jti,
      createdByAccount: user.account,
      readAccess: [user.account].filter(Boolean),
      writeAccess: [user.account].filter(Boolean),
      adminAccess: [user.account].filter(Boolean),
    }

    return super.create({...defaults, ...input})
  }

  updateOne(user: Token, conditions: any, input: any): Promise<T | null>
  updateOne(conditions: any, input: any): Promise<T | null>
  public async updateOne(userOrConditions: Token | any, conditionsOrInput: any, input?: any) {
    if (!input) {
      return super.updateOne(userOrConditions, conditionsOrInput)
    }
    return super.updateOne({...conditionsOrInput, ...this.getWriteConditionsForUser(userOrConditions)}, input)
  }

  updateById(user: Token, id: string, input: any): Promise<T>
  updateById(id: string, input: any): Promise<T>
  public async updateById(userOrId: Token | string, idOrInput: string | any, input?: any) {
    if (!input) {
      return super.updateById(userOrId as string, idOrInput)
    }
    return super.updateOne({_id: idOrInput as string, ...this.getWriteConditionsForUser(userOrId as Token)}, input)
  }

  // TODO: delete should remove user's account permissions from the entity instead of deleting
  delete(user: Token, id: string): Promise<boolean>
  delete(id: string): Promise<boolean>
  public async delete(userOrId: Token | string, id?: string) {
    if (!id) {
      return super.delete(userOrId as string)
    }
    // @ts-ignore
    const response = await this.model.deleteOne({
      _id: id as string,
      ...this.getWriteConditionsForUser(userOrId as Token),
    })
    return response.ok === 1
  }
}
