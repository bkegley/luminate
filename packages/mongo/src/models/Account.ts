import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'
import {AuthenticatedUserDocument} from './Person'

export interface AccountDocument extends DocumentWithTimestamps {
  name: string
}

export interface AccountModel extends WithAuthenticatedMethods<AccountDocument> {
  findAccountsByUser: (
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.find> | undefined[]
  ) => mongoose.DocumentQuery<AccountDocument[], AccountDocument, {}>
}

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
  static findAccountsByUser(
    user: AuthenticatedUserDocument | null,
    ...args: Parameters<typeof mongoose.Model.find> | undefined[]
  ) {
    const [conditions = {}] = args
    const {$or, ...remainingConditions} = conditions

    // const authConditions = buildReadConditionsForUser(user)

    // const additionalConditions = $or ? {$and: [{$or: $or}, authConditions]} : authConditions

    return this.find({
      ...remainingConditions,
      // ...additionalConditions,
    })
  }
}

Account.loadClass(AuthenticatedEntity)

export default mongoose.model<AccountDocument, AccountModel>('account', Account)
