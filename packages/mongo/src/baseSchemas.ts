import mongoose from 'mongoose'
import {Token} from '@luminate/graphql-utils'

export const BasePublicSchema = new mongoose.Schema({
  permissionType: {
    type: String,
    enum: ['public'],
    default: 'public',
  },
})

export const BaseAuthenticatedSchema = new mongoose.Schema({
  createdByUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdByAccount: {
    type: mongoose.Schema.Types.ObjectId,
  },
  readAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  writeAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  adminAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  permissionType: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
})

// TODO: identify args with type overloads
export class AuthenticatedEntity extends mongoose.Model {
  static buildReadConditionsForUser(user: Token | null): any {
    return {
      $or: [
        {permissionType: 'public'},
        {
          $or: [
            {
              readAccess: {
                $elemMatch: {
                  $in: [user?.account?.id].filter(Boolean),
                },
              },
            },
            {
              adminAccess: {
                $elemMatch: {
                  $in: [user?.account?.id].filter(Boolean),
                },
              },
            },
          ],
        },
      ],
    }
  }

  static buildWriteConditionsForUser(user: Token | null): any {
    return {
      $or: [
        {
          writeAccess: {
            $elemMatch: {
              $in: [user?.account?.id].filter(Boolean),
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: [user?.account?.id].filter(Boolean),
            },
          },
        },
      ],
    }
  }

  static buildAdminConditionsForUser(user: Token | null): any {
    return {
      adminAccess: {
        $elemMatch: {
          $in: [user?.account?.id].filter(Boolean),
        },
      },
    }
  }

  static findByUser(user: Token | null, ...args: Parameters<typeof mongoose.Model.find> | undefined[]) {
    const [conditions = {}] = args
    const {$or, ...remainingConditions} = conditions

    const authConditions = this.buildReadConditionsForUser(user)

    const additionalConditions = $or ? {$and: [{$or: $or}, authConditions]} : authConditions

    return this.find({
      ...remainingConditions,
      ...additionalConditions,
    })
  }

  static findByIdByUser(
    user: Token | null,
    id: mongoose.Types.ObjectId | string,
    ...args: Parameters<typeof mongoose.Model.findById> | undefined[]
  ) {
    return this.findOne({_id: id, ...this.buildReadConditionsForUser(user)})
  }

  static findOneAndUpdateByUser(
    user: Token | null,
    ...args: Parameters<typeof mongoose.Model.findOneAndUpdate> | undefined[]
  ) {
    const [conditions = {}, input = {}, options = {}] = args
    const {$or, ...remainingConditions} = conditions

    const authConditions = this.buildWriteConditionsForUser(user)

    const additionalConditions = $or ? {$and: [{$or: $or}, authConditions]} : authConditions

    return this.findOneAndUpdate(
      {
        ...remainingConditions,
        ...additionalConditions,
      },
      input,
      options,
    )
  }

  static createByUser(user: Token | null, ...args: Parameters<typeof mongoose.Model.create>) {
    const [doc] = args
    return this.create({
      ...doc,
      createdByUser: user?.jti,
      createdByAccount: user?.account?.id,
      readAccess: [user?.account?.id].filter(Boolean),
      writeAccess: [user?.account?.id].filter(Boolean),
      adminAccess: [user?.account?.id].filter(Boolean),
    })
  }

  static findByIdAndUpdateByUser(user: Token | null, ...args: Parameters<typeof mongoose.Model.findByIdAndUpdate>) {
    const [id, update = {}, options] = args
    return this.findOneAndUpdate({_id: id, ...this.buildWriteConditionsForUser(user)}, update, options)
  }

  /**
   * Removes read/write/admin access from user's account (i.e. "deletes" the entity)
   * @param user the authenticated user
   * @param args db.collection.findByIdAndDelete
   */
  static findByIdAndDeleteByUser(user: Token | null, ...args: Parameters<typeof mongoose.Model.findByIdAndDelete>) {
    const [id, options] = args
    console.log({user, id, options})
    return this.findOneAndUpdate(
      {_id: id, ...this.buildWriteConditionsForUser(user)},
      {
        $pull: {
          readAccess: user?.account?.id,
          writeAccess: user?.account?.id,
          adminAccess: user?.account?.id,
        },
      },
      options,
    )
  }

  static updateEntityPermissionsForAccountByUser(
    user: Token | null,
    entityId: mongoose.Types.ObjectId | string,
    accountId: mongoose.Types.ObjectId | string,
    permissions: Array<'read' | 'write'>,
  ) {
    const push = Object.assign(
      {},
      permissions.includes('read') ? {readAccess: accountId} : null,
      permissions.includes('write') ? {writeAccess: accountId} : null,
    )
    const pull = Object.assign(
      {},
      !permissions.includes('read') ? {readAccess: accountId} : null,
      !permissions.includes('write') ? {writeAccess: accountId} : null,
    )
    return this.findOneAndUpdate(
      {
        _id: entityId,
        ...this.buildWriteConditionsForUser(user),
      },
      {
        $push: push,
        $pull: pull,
      },
      {new: true},
    )
  }

  static makeEntityPublicByUser(user: Token | null, entityId: mongoose.Types.ObjectId | string) {
    return this.findOneAndUpdate(
      {
        _id: entityId,
        ...this.buildAdminConditionsForUser(user),
      },
      {
        $set: {
          permissionType: 'public',
          readAccess: [],
          writeAccess: [],
        },
      },
    )
  }
}

export interface WithAuthenticatedMethods<T extends mongoose.Document> extends mongoose.Model<T> {
  findByUser: (
    user: Token | null,
    ...args: Parameters<typeof mongoose.Model.find> | undefined[]
  ) => mongoose.DocumentQuery<T[], T, {}>

  findByIdByUser: (
    user: Token | null,
    ...args: Partial<Parameters<typeof mongoose.Model.findById>> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  findOneAndUpdateByUser: (
    user: Token | null,
    ...args: Partial<Parameters<typeof mongoose.Model.findOneAndUpdate>> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  createByUser: (
    user: Token | null,
    ...args: Parameters<typeof mongoose.Model.create> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  findByIdAndUpdateByUser: (
    user: Token | null,
    ...args: Parameters<typeof mongoose.Model.findByIdAndUpdate> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  findByIdAndDeleteByUser: (
    user: Token | null,
    ...args: Parameters<typeof mongoose.Model.findByIdAndDelete> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  updateEntityPermissionsForAccountByUser: (
    user: Token | null,
    entityId: mongoose.Types.ObjectId | string,
    accountId: mongoose.Types.ObjectId | string,
    permissions: Array<'read' | 'write'>,
  ) => mongoose.DocumentQuery<T, T, {}>

  makeEntityPublicByUser: (
    user: Token | null,
    entityId: mongoose.Types.ObjectId | string,
  ) => mongoose.DocumentQuery<T, T, {}>
}
