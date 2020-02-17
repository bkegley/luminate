import mongoose from 'mongoose'
import {DocumentWithTimestamps, Token} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

const buildAccountReadConditionsForUser = (user: Token | null) => {
  return {
    $or: [
      {permissionType: 'public'},
      {
        $or: [
          {
            _id: user?.accounts?.map(account => account.id),
          },
          {
            readAccess: {
              $elemMatch: {
                $in: user && user.accounts ? [user.accounts.map(account => account.id)] : [],
              },
            },
          },
          {
            adminAccess: {
              $elemMatch: {
                $in: user && user.accounts ? [user.accounts.map(account => account.id)] : [],
              },
            },
          },
        ],
      },
    ],
  }
}

const buildAccountWriteConditionsForUser = (user: Token | null) => {
  return {
    $or: [
      {
        _id: user?.accounts?.map(account => account.id),
      },
      {
        writeAccess: {
          $elemMatch: {
            $in: user && user.accounts ? [user.accounts.map(account => account.id)] : [],
          },
        },
      },
      {
        adminAccess: {
          $elemMatch: {
            $in: user && user.accounts ? [user.accounts.map(account => account.id)] : [],
          },
        },
      },
    ],
  }
}

const buildAccountAdminConditionsForUser = (user: Token | null) => {
  return {
    $or: [
      {
        _id: user?.accounts?.map(account => account.id),
      },
      {
        adminAccess: {
          $elemMatch: {
            $in: user && user.accounts ? [user.accounts.map(account => account.id)] : [],
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
  static findByUser(user: Token | null, ...args: Parameters<typeof mongoose.Model.find> | undefined[]) {
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
