import {Model, Document} from 'mongoose'
import {parseArgs, TQueryInput} from './parseArgs'
import {createCursorHash} from './cursor'

interface ArgsInput {
  cursor?: string | null | undefined
  limit?: number | null | undefined
  query?: TQueryInput
  [x: string]: any
}

interface DocumentWithTimestamps extends Document {
  createdAt: string
  updatedAt: string
}

interface CreateConnectionResultsArgs {
  args: ArgsInput
  model: Model<DocumentWithTimestamps, {updatedAt: string}>
}

const createConnectionResults = async ({args, model}: CreateConnectionResultsArgs) => {
  const cursor = args.cursor || createCursorHash(new Date())
  const limit = args.limit || 100
  const query = args.query

  const documentsPlusOne = await model.find({...parseArgs({cursor, query})}, null, {
    sort: '-updatedAt',
    limit: limit ? limit + 1 : 100 + 1,
  })

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

  const hasNextPage = documentsPlusOne.length > limit
  const documents = hasNextPage ? documentsPlusOne.slice(0, -1) : documentsPlusOne

  const nextCursor = hasNextPage ? createCursorHash(documentsPlusOne[documentsPlusOne.length - 1].updatedAt) : null

  const data = {
    pageInfo: {
      hasNextPage,
      nextCursor,
      previousCursor: '',
    },
    edges: documents.map((document: any) => {
      return {
        node: document,
        cursor: createCursorHash(document.updatedAt),
      }
    }),
  }

  return data
}

export {createConnectionResults}
