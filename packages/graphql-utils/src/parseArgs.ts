import {parseCursorHash} from './cursor'
import {QueryInput, Maybe} from './types'

export type TQueryInput = Maybe<QueryInput>[] | Maybe<QueryInput> | undefined | null

const queryInputMap = (query: TQueryInput) => {
  if (!query) return null
  if (Array.isArray(query)) {
    return Object.assign({}, ...query.map(individualQuery => getQueryValue(individualQuery)))
  } else {
    return getQueryValue(query)
  }
}

const getQueryValue = (query: QueryInput | null) => {
  if (!query) return null
  switch (query.operator) {
    case 'eq':
    case 'ne':
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte': {
      return {[query.field]: {[`$${query.operator}`]: query.value}}
    }
    case 'contains':
    case 'containsSensitive':
    default: {
      return {
        [query.field]: Object.assign(
          {$regex: `.*${query.value}.*`},
          query.operator === 'contains' ? {$options: 'i'} : null,
        ),
      }
    }
  }
}

interface Args {
  cursor: string
  query?: TQueryInput
  [x: string]: any
}

const parseArgs = (args: Args) => {
  const {cursor, query, ...remainingArgs} = args
  return {
    ...remainingArgs,
    ...queryInputMap(query),
    updatedAt: {
      $lte: parseCursorHash(cursor),
    },
  }
}

export {parseArgs, queryInputMap}
