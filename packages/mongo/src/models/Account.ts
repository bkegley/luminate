import mongoose from 'mongoose'
import {DocumentWithTimestamps, Token} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

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
  static buildReadConditionsForUser(user: Token | null) {
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
                  $in: user && user.account ? [user.account.id] : [],
                },
              },
            },
            {
              adminAccess: {
                $elemMatch: {
                  $in: user && user.account ? [user.account.id] : [],
                },
              },
            },
          ],
        },
      ],
    }
  }

  static buildWriteConditionsForUser(user: Token | null) {
    return {
      $or: [
        {
          _id: user?.account?.id,
        },
        {
          writeAccess: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
      ],
    }
  }

  static buildAdminConditionsForUser(user: Token | null) {
    return {
      $or: [
        {
          _id: user?.account?.id,
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
      ],
    }
  }
}

Account.loadClass(AccountAuthenticatedEntity)

export default mongoose.model<AccountDocument, AccountModel>('account', Account)
