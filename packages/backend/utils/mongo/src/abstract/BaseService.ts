import * as mongoose from 'mongoose'
import {Cursor} from '../utils/Cursor'
import {BaseDocument} from './BaseDocument'
import {QueryInputParser} from '../utils'
import {IListDocumentsArgs} from './types'
import {IService} from './IService'

export class BaseService<T extends BaseDocument> implements IService<T> {
  constructor(model: mongoose.Model<T>) {
    this.model = model
  }

  protected model: mongoose.Model<T>

  protected limit = 25

  protected buildConnectionQuery(args: IListDocumentsArgs): [any, null, any] {
    const {cursor, limit, query, sortBy, ...remainingArgs} = args

    const mappedQueryInput = QueryInputParser.getQueryValue(query)

    const paginationCursor = cursor
      ? sortBy
        ? {
            [sortBy.field]: {
              // [sortBy.descending ? '$lte' : '$gte']: Cursor.parseCursor(cursor),
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
        ? Object.assign(remainingArgs, ...mappedQueryInput, paginationCursor)
        : {...remainingArgs, ...paginationCursor},
      null,
      {
        sort: sortBy ? `${sortBy.descending ? '' : '-'}${sortBy.field}` : '-updatedAt',
        limit: limit ? limit + 1 : this.limit + 1,
      },
    ]
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    const documentsPlusOne = await this.model.find(...this.buildConnectionQuery(args))
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

  public async create(input: any) {
    return await new this.model(input).save()
  }

  public async updateOne(conditions: any, input: any, options?: mongoose.QueryFindOneAndUpdateOptions) {
    return await this.model.findOneAndUpdate(conditions, input, options || {new: true})
  }

  public async updateById(id: string, input: any, options?: mongoose.QueryFindOneAndUpdateOptions) {
    return await this.model.findByIdAndUpdate(id, input, options || {new: true})
  }

  public async deleteById(id: string) {
    return await this.model.findByIdAndDelete(id)
  }
}
