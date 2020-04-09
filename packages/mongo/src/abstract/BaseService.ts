import mongoose from 'mongoose'
import {Cursor} from '../utils/Cursor'
import {BaseDocument} from './documents'
import {QueryInput} from '../utils/QueryInput'
import {IListDocumentsArgs} from './types'

export class BaseService<T extends BaseDocument> {
  constructor(model: mongoose.Model<T>) {
    this.model = model
  }

  protected model: mongoose.Model<T>

  protected limit = 25

  protected buildConnectionQuery(args: IListDocumentsArgs): [any, null, any] {
    const {cursor, limit, query, ...remainingArgs} = args

    const mappedQueryInput = QueryInput.getQueryValue(query)

    return [
      mappedQueryInput?.length
        ? Object.assign(remainingArgs, ...mappedQueryInput, {
            updatedAt: {
              $lte: Cursor.parseCursor(cursor || Cursor.createCursor(new Date())),
            },
          })
        : {
            ...remainingArgs,
            updatedAt: {
              $lte: Cursor.parseCursor(cursor || Cursor.createCursor(new Date())),
            },
          },
      null,
      {
        sort: '-updatedAt',
        limit: limit || this.limit,
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
    const nextCursor = hasNextPage ? Cursor.createCursor(documentsPlusOne[documentsPlusOne.length - 1].updatedAt) : null

    return {
      pageInfo: {
        hasNextPage,
        nextCursor,
        previousCursor: '',
      },
      edges: documents.map(document => {
        return {
          node: document,
          cursor: Cursor.createCursor(document.updatedAt),
        }
      }),
    }
  }

  public async create(input: any) {
    const newEntity = await new this.model(input).save()
    return newEntity
  }

  public updateOne(conditions: any, input: any, options?: mongoose.QueryFindOneAndUpdateOptions) {
    return this.model.findOneAndUpdate(conditions, input, options || {new: true})
  }

  public updateById(id: string, input: any, options?: mongoose.QueryFindOneAndUpdateOptions) {
    return this.model.findByIdAndUpdate(id, input, options || {new: true})
  }

  public deleteById(id: string) {
    return this.model.findByIdAndDelete(id)
  }
}
