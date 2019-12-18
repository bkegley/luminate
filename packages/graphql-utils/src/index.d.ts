// export type LoaderFn<T> = (ids: T extends any[] ? string[][] : string[], models: any) => Promise<Array<T>>
export type LoaderFn<T> = (ids: unknown[], models: any) => Promise<Array<T>>
