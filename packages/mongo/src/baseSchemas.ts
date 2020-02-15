import mongoose from 'mongoose'
import {AuthenticatedUserDocument} from './index'

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

const buildReadConditionsForUser = (user: AuthenticatedUserDocument | null) => {
  return {
    $or: [
      {permissionType: 'public'},
      {
        $or: [
          {
            readAccess: {
              $elemMatch: {
                $in: [user?.account?._id].filter(Boolean),
              },
            },
          },
          {
            adminAccess: {
              $elemMatch: {
                $in: [user?.account?._id].filter(Boolean),
              },
            },
          },
        ],
      },
    ],
  }
}

const buildWriteConditionsForUser = (user: AuthenticatedUserDocument | null) => {
  return {
    $or: [
      {
        writeAccess: {
          $elemMatch: {
            $in: [user?.account?._id].filter(Boolean),
          },
        },
      },
      {
        adminAccess: {
          $elemMatch: {
            $in: [user?.account?._id].filter(Boolean),
          },
        },
      },
    ],
  }
}

const buildAdminConditionsForUser = (user: AuthenticatedUserDocument | null) => {
  return {
    adminAccess: {
      $elemMatch: {
        $in: [user?.account?._id].filter(Boolean),
      },
    },
  }
}

// TODO: identify args with type overloads
export class AuthenticatedEntity extends mongoose.Model {
  static findByUser(
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.find> | undefined[]
  ) {
    const [conditions = {}] = args
    const {$or, ...remainingConditions} = conditions

    const authConditions = buildReadConditionsForUser(user)

    const additionalConditions = $or ? {$and: [{$or: $or}, authConditions]} : authConditions

    return this.find({
      ...remainingConditions,
      ...additionalConditions,
    })
  }

  static findByIdByUser(
    user: AuthenticatedUserDocument | null,
    id: mongoose.Types.ObjectId | string,
    ...args: Parameters<typeof mongoose.Model.findById> | undefined[]
  ) {
    return this.findOne({_id: id, ...buildReadConditionsForUser(user)})
  }

  static findOneAndUpdateByUser(
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.findOneAndUpdate> | undefined[]
  ) {
    const [conditions = {}, input = {}, options = {}] = args
    const {$or, ...remainingConditions} = conditions

    const authConditions = buildWriteConditionsForUser(user)

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

  static createByUser(user: AuthenticatedUserDocument | null, ...args: Parameters<typeof mongoose.Model.create>) {
    const [doc] = args
    return this.create({
      ...doc,
      createdByUser: user?._id,
      createdByAccount: user?.account?._id,
      readAccess: [user?.account?._id].filter(Boolean),
      writeAccess: [user?.account?._id].filter(Boolean),
      adminAccess: [user?.account?._id].filter(Boolean),
    })
  }

  static findByIdAndUpdateByUser(
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.findByIdAndUpdate>
  ) {
    const [id, update = {}, options] = args
    return this.findOneAndUpdate({_id: id, ...buildWriteConditionsForUser(user)}, update, options)
  }

  /**
   * Removes read/write/admin access from user's account (i.e. "deletes" the entity)
   * @param user the authenticated user
   * @param args db.collection.findByIdAndDelete
   */
  static findByIdAndDeleteByUser(
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.findByIdAndDelete>
  ) {
    const [id, options] = args
    console.log({user, id, options})
    return this.findOneAndUpdate(
      {_id: id, ...buildWriteConditionsForUser(user)},
      {
        $pull: {
          readAccess: user?.account?._id,
          writeAccess: user?.account?._id,
          adminAccess: user?.account?._id,
        },
      },
      options,
    )
  }

  static updateEntityPermissionsForAccountByUser(
    user: AuthenticatedUserDocument | null,
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
        ...buildWriteConditionsForUser(user),
      },
      {
        $push: push,
        $pull: pull,
      },
      {new: true},
    )
  }

  static makeEntityPublicByUser(user: AuthenticatedUserDocument | null, entityId: mongoose.Types.ObjectId | string) {
    return this.findOneAndUpdate(
      {
        _id: entityId,
        ...buildAdminConditionsForUser(user),
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
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.find> | undefined[]
  ) => mongoose.DocumentQuery<T[], T, {}>

  findByIdByUser: (
    user: AuthenticatedUserDocument | null,
    ...args: Partial<Parameters<typeof mongoose.Model.findById>> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  findOneAndUpdateByUser: (
    user: AuthenticatedUserDocument | null,
    ...args: Partial<Parameters<typeof mongoose.Model.findOneAndUpdate>> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  createByUser: (
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.create> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  findByIdAndUpdateByUser: (
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.findByIdAndUpdate> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  findByIdAndDeleteByUser: (
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.findByIdAndDelete> | undefined[]
  ) => mongoose.DocumentQuery<T, T, {}>

  updateEntityPermissionsForAccountByUser: (
    user: AuthenticatedUserDocument | null,
    entityId: mongoose.Types.ObjectId | string,
    accountId: mongoose.Types.ObjectId | string,
    permissions: Array<'read' | 'write'>,
  ) => mongoose.DocumentQuery<T, T, {}>

  makeEntityPublicByUser: (
    user: AuthenticatedUserDocument | null,
    entityId: mongoose.Types.ObjectId | string,
  ) => mongoose.DocumentQuery<T, T, {}>
}
