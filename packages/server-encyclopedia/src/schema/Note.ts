import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    field: String!
    createdAt: String
    updatedAt: String
  }

  input CreateNoteInput {
    entityId: ID!
    content: String!
    field: String!
  }

  input UpdateNoteInput {
    entityId: ID
    content: String
    field: String
  }

  type Mutation {
    createNote(input: CreateNoteInput): Note
    updateNote(id: ID!, input: UpdateNoteInput): Note
    deleteNote(id: ID!): Note
  }
`

const resolvers: Resolvers = {
  Mutation: {
    createNote: async (parent, {input}, {services}) => {
      return services.note.create(input)
    },
    updateNote: async (parent, {id, input}, {services}) => {
      return services.note.updateById(id, input)
    },
    deleteNote: async (parent, {id}, {services}) => {
      return services.note.deleteById(id)
    },
  },
}

export const schema = {typeDefs, resolvers}
