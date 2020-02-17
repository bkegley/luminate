import mongoose from 'mongoose'
import {parseArgs, TQueryInput} from './parseArgs'
import {createCursorHash} from './cursor'
import {WithAuthenticatedMethods} from '@luminate/mongo'
import {Token} from './auth'

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
  model: WithAuthenticatedMethods<T>
  user: Token | null
}

type ExtractModelType<T> = T extends mongoose.Model<infer M> ? M : never

export async function createConnectionResults<T extends DocumentWithTimestamps>({
  args,
  model,
  user,
}: CreateConnectionResultsArgs<T>) {
  const {cursor, limit, query, ...remainingArgs} = args
  const cursorWithDefault = cursor || createCursorHash(new Date())
  const limitWithDefault = limit || 100

  const documentsPlusOne: Array<ExtractModelType<typeof model>> = await model.findByUser(
    user,
    {...remainingArgs, ...parseArgs({cursor: cursorWithDefault, query})},
    null,
    {
      sort: '-updatedAt',
      limit: limitWithDefault + 1,
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

  const hasNextPage = documentsPlusOne.length > limitWithDefault
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
