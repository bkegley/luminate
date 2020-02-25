import {BatchLoadFn, default as Dataloader} from 'dataloader'
import mongoose from 'mongoose'
import {models as dbModels} from '@luminate/mongo'
import {Token} from './auth'

export type LoaderFn<T> = (
  ids: string[],
  models: typeof dbModels,
  user: Token | null,
) => ReturnType<BatchLoadFn<string, T | null | undefined>>

type ExtractGraphQLType<L> = L extends LoaderFn<infer T> ? T : never

export type LoaderContext<L> = {
  [K in keyof L]: Dataloader<string | mongoose.Types.ObjectId, ExtractGraphQLType<L[K]>>
}

export {createConnectionResults, DocumentWithTimestamps} from './createConnectionResults'
export {createCursorHash, parseCursorHash} from './cursor'
export {parseArgs, queryInputMap} from './parseArgs'
export * from './auth'
export * from './scopes'
export * from './scopeEnums'
export * from './schema'
