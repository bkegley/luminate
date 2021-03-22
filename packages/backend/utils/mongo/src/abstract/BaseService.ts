import {Cursor} from '../utils/Cursor'
import {BaseDocument} from './BaseDocument'
import {QueryInputParser} from '../utils'
import {IListDocumentsArgs} from './types'
import {IService} from './IService'
import {IRepo} from '.'

export abstract class BaseService<T> implements IService<T> {
  constructor(protected repo: IRepo<any>) {}

  protected limit = 25

  protected buildConnectionQuery(args: IListDocumentsArgs): [any, null, any] {
    const {cursor, limit, query, sortBy, ...remainingArgs} = args

    const mappedQueryInput = QueryInputParser.getQueryValue(query)

    const paginationCursor = cursor
      ? sortBy
        ? {
            [sortBy.field]: {
              [sortBy.descending ? '$gte' : '$lte']: Cursor.parseCursor(cursor),
            },
          }
        : {
            updatedAt: {
              $lte: Cursor.parseCursor(cursor),
            },
          }
      : {}

    return [
      mappedQueryInput?.length
        ? {$and: [remainingArgs, ...mappedQueryInput, paginationCursor].filter(Boolean)}
        : {...remainingArgs, ...paginationCursor},
      null,
      {
        sort: sortBy ? `${sortBy.descending ? '' : '-'}${sortBy.field}` : '-updatedAt',
        limit: limit ? limit + 1 : this.limit + 1,
      },
    ]
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    const documentsPlusOne = await this.repo.list(this.buildConnectionQuery(args))

    if (!documentsPlusOne.length) {
      return {
        pageInfo: {
          hasNextPage: false,
          nextCursor: null,
          previousCursor: '',
        },
        edges: [],
      }
    }

    const hasNextPage = documentsPlusOne.length > (args.limit || this.limit)
    const documents = hasNextPage ? documentsPlusOne.slice(0, -1) : documentsPlusOne

    const cursorField = (args.sortBy?.field ?? 'updatedAt') as keyof BaseDocument
    const nextCursor = hasNextPage
      ? Cursor.createCursor(documentsPlusOne[documentsPlusOne.length - 1][cursorField])
      : null

    return {
      pageInfo: {
        hasNextPage,
        nextCursor,
        previousCursor: '',
      },
      edges: documents.map(document => {
        return {
          node: document,
          cursor: Cursor.createCursor(document[cursorField]),
        }
      }),
    }
  }

  public abstract create(input: any): any
  public abstract updateOne(conditions: any, input: any): any
  public abstract updateById(id: string, input: any): any
  public abstract deleteById(id: string): any
}
