import {FilterQuery, Model} from 'mongoose'
import {Cursor} from '../utils/Cursor'
import {BaseDocument} from './BaseDocument'
import {QueryInputParser} from '../utils'
import {IListDocumentsArgs} from './types'
import {IRepo} from './IRepo'

export abstract class BaseRepo<T extends BaseDocument> implements IRepo<T> {
  constructor(protected model: Model<T>) {}

  protected limit = 25

  protected buildConnectionQuery(args: IListDocumentsArgs): [any, null, any] {
    const {cursor, limit, query, sortBy, ...remainingArgs} = args

    const mappedQueryInput = QueryInputParser.getQueryValue(query)

    const paginationCursor = cursor
      ? {
          updatedAt: {
            [sortBy?.descending ? '$gte' : '$lte']: Cursor.parseCursor(cursor),
          },
        }
      : {}

    return [
      mappedQueryInput?.length
        ? {$and: [remainingArgs, ...mappedQueryInput, paginationCursor].filter(Boolean)}
        : {...remainingArgs, ...paginationCursor},
      null,
      {
        sort: Object.assign({}, sortBy ? {[sortBy.field]: sortBy.descending ? -1 : 1} : null, {updatedAt: -1}),
        limit: limit ? limit + 1 : this.limit + 1,
      },
    ]
  }

  public async getConnectionResults(args: IListDocumentsArgs): Promise<any> {
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

    const cursorField = 'updatedAt'
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

  public async list(args?: FilterQuery<T>): Promise<T[]> {
    if (!args) {
      return this.model.find()
    }
    return this.model.find(args)
  }

  public async getById(id: string) {
    return this.model.findById(id)
  }

  public async create(input: any) {
    return await new this.model(input).save()
  }

  public async updateOne(conditions: any, input: any) {
    return await this.model.findOneAndUpdate(conditions, input, {new: true})
  }

  public async updateById(id: string, input: any) {
    return await this.model.findByIdAndUpdate(id, input, {new: true})
  }

  public async delete(id: string) {
    const response = await this.model.findByIdAndDelete(id)
    return !!response
  }
}
