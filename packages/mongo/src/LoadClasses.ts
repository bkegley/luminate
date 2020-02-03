import mongoose from 'mongoose'
import {UserDocument} from './index'

// WIP
export interface WithAuthenticatedMethods<T extends mongoose.Document> extends mongoose.Model<T> {
  findPrivate: (
    user: UserDocument | null,
    ...args: Parameters<typeof mongoose.Model.find> | undefined[]
  ) => mongoose.DocumentQuery<T[], T, {}>
}

const buildMatchUserParam = (user: UserDocument | null) => {
  return {
    visibleTo: {
      $elemMatch: {
        $in: user ? (user.accounts || []).concat((user.id as unknown) as mongoose.Types.ObjectId) : [],
      },
    },
  }
}

export class PublicAndPrivateEntity extends mongoose.Model {
  static findForUser(user: UserDocument | null, ...args: Parameters<typeof mongoose.Model.find> | undefined[]) {
    const [conditions, options] = args
    return this.find({
      ...conditions,
      $or: [{visibleTo: null}, {visibleTo: {$size: 0}}, buildMatchUserParam(user)],
    })
  }
  static findByIdForUser(
    user: UserDocument | null,
    id: mongoose.Types.ObjectId | string,
    ...args: Parameters<typeof mongoose.Model.findById> | undefined[]
  ) {
    const [options] = args
    return this.findOne({_id: id, $or: [{visibleTo: null}, {visibleTo: {$size: 0}}, buildMatchUserParam(user)]})
  }
}

export class PrivateEntity extends mongoose.Model {
  static findForUser(user: UserDocument | null, ...args: Parameters<typeof mongoose.Model.find> | undefined[]) {
    const [conditions, options] = args
    return this.find({
      ...conditions,
      ...buildMatchUserParam(user),
    })
  }
}
