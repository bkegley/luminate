import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'
import {AuthenticatedUserDocument} from './Person'

const buildAccountReadConditionsForUser = (user: AuthenticatedUserDocument | null) => {
  return {
    $or: [
      {permissionType: 'public'},
      {
        $or: [
          {
            _id: user?.accounts,
          },
          {
            readAccess: {
              $elemMatch: {
                $in: user ? [user.accounts] : [],
              },
            },
          },
          {
            adminAccess: {
              $elemMatch: {
                $in: user ? [user.accounts] : [],
              },
            },
          },
        ],
      },
    ],
  }
}

const buildAccountWriteConditionsForUser = (user: AuthenticatedUserDocument | null) => {
  return {
    $or: [
      {
        _id: user?.accounts,
      },
      {
        writeAccess: {
          $elemMatch: {
            $in: user ? [user.accounts] : [],
          },
        },
      },
      {
        adminAccess: {
          $elemMatch: {
            $in: user ? [user.accounts] : [],
          },
        },
      },
    ],
  }
}

const buildAccountAdminConditionsForUser = (user: AuthenticatedUserDocument | null) => {
  return {
    $or: [
      {
        _id: user?.accounts,
      },
      {
        adminAccess: {
          $elemMatch: {
            $in: user ? [user.accounts] : [],
          },
        },
      },
    ],
  }
}

export interface AccountDocument extends DocumentWithTimestamps {
  name: string
}

export interface AccountModel extends WithAuthenticatedMethods<AccountDocument> {}

const Account = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
)

class AccountAuthenticatedEntity extends AuthenticatedEntity {
  static findByUser(
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.find> | undefined[]
  ) {
    const [conditions = {}] = args
    const {$or, ...remainingConditions} = conditions

    const authConditions = buildAccountReadConditionsForUser(user)

    const additionalConditions = $or ? {$and: [{$or: $or}, authConditions]} : authConditions

    return this.find({
      ...remainingConditions,
      ...additionalConditions,
    })
  }
}

Account.loadClass(AccountAuthenticatedEntity)

export default mongoose.model<AccountDocument, AccountModel>('account', Account)
