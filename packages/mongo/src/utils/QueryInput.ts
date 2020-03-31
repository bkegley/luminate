export interface IQueryInput {
  field: string
  value?: string
  operator?: string
}

export class QueryInput {
  public static getQueryValue(queries?: Array<IQueryInput>) {
    if (!queries) return null
    return queries.map(query => {
      switch (query.operator) {
        case 'eq':
        case 'ne':
        case 'gt':
        case 'gte':
        case 'lt':
        case 'lte': {
          return {[query.field]: {[`$${query.operator}`]: query.value || null}}
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
    })
  }
}
