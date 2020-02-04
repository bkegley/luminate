import {BatchLoadFn, default as Dataloader} from 'dataloader'
import mongoose from 'mongoose'
import {models as dbModels, UserDocument} from '@luminate/mongo'

export type LoaderFn<T> = (
  ids: string[],
  models: typeof dbModels,
  user: UserDocument | null,
) => ReturnType<BatchLoadFn<string, T>>

type ExtractGraphQLType<L> = L extends LoaderFn<infer T> ? T : never

export type LoaderContext<L> = {
  [K in keyof L]: Dataloader<string | mongoose.Types.ObjectId, ExtractGraphQLType<L[K]>>
}

export {createConnectionResults, DocumentWithTimestamps} from './createConnectionResults'
export {createPublicConnectionResults} from './createPublicConnectionResults'
export {createCursorHash, parseCursorHash} from './cursor'
export {parseArgs, queryInputMap} from './parseArgs'
export {createToken, hasRole, hasScopes, parseToken, parseUserFromRequest} from './auth'
export {sharedTypeDefs} from './schema/sharedTypeDefs'
