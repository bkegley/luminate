import {BatchLoadFn, default as Dataloader} from 'dataloader'

export type LoaderFn<T> = (ids: string[], models: any) => ReturnType<BatchLoadFn<string, T>>
type ExtractGraphQLType<L> = L extends LoaderFn<infer T> ? T : never

export type LoaderContext<L> = {
  [K in keyof L]: Dataloader<string, ExtractGraphQLType<L[K]>>
}

export {createConnectionResults} from './createConnectionResults'
export {createCursorHash, parseCursorHash} from './cursor'
export {parseArgs} from './parseArgs'
export {sharedTypeDefs} from './schema/sharedTypeDefs'
