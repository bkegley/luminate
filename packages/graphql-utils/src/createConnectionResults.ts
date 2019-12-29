import * as mongoose from 'mongoose'
import {parseArgs, TQueryInput} from './parseArgs'
import {createCursorHash} from './cursor'

interface ArgsInput {
  cursor?: string | null | undefined
  limit?: number | null | undefined
  query?: TQueryInput
  [x: string]: any
}

export interface DocumentWithTimestamps extends mongoose.Document {
  id: string
  createdAt: string
  updatedAt: string
}

interface CreateConnectionResultsArgs<T extends DocumentWithTimestamps> {
  args: ArgsInput
  model: mongoose.Model<T>
}

type ExtractModelType<T> = T extends mongoose.Model<infer M> ? M : never

export async function createConnectionResults<T extends DocumentWithTimestamps>({
  args,
  model,
}: CreateConnectionResultsArgs<T>) {
  // export async function createConnectionResults({args, model}: CreateConnectionResultsArgs<mongoose.Document>) {
  const cursor = args.cursor || createCursorHash(new Date())
  const limit = args.limit || 100
  const query = args.query

  const documentsPlusOne: Array<ExtractModelType<typeof model>> = await model.find(
    {...args, ...parseArgs({cursor, query})},
    null,
    {
      sort: '-updatedAt',
      limit: limit ? limit + 1 : 100 + 1,
    },
  )

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
    edges: documents.map(document => {
      return {
        node: document,
        cursor: createCursorHash(document.updatedAt),
      }
    }),
  }

  return data
}
