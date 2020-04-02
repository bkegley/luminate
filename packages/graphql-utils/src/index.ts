import {BatchLoadFn, default as DataLoader} from 'dataloader'

export * from './ContextBuilder'

export type LoaderFn<T, V> = (ids: string[], services: V) => ReturnType<BatchLoadFn<string, T | null | undefined>>

type ExtractGraphQLType<L> = L extends LoaderFn<infer T, any> ? T : never

export type LoaderContext<L> = {
  [K in keyof L]: DataLoader<string, ExtractGraphQLType<L[K]>>
}

export {createCursorHash, parseCursorHash} from './cursor'
export {parseArgs, queryInputMap} from './parseArgs'
export * from './auth'
export * from './scopes'
export * from './scopeEnums'
export * from './schema'
