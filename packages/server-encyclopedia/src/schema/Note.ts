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

export interface NoteLoaders {
  // notes: LoaderFn<NoteDocument>
  // notesOfEntity: LoaderFn<NoteDocument[]>
}

export const loaders: NoteLoaders = {
  // notes: async (ids, models, user) => {
  //   const {Note} = models
  //   const notes = await Note.findByUser(user, {_id: ids})
  //   return ids.map(id => {
  //     const note = notes.find(note => note._id.toString() === id.toString())
  //     if (!note) return null
  //     return note
  //   })
  // },
  // notesOfEntity: async (entityIds, models, user) => {
  //   const {Note} = models
  //   const notes = await Note.findByUser(user, {entityId: entityIds})
  //   return entityIds.map(id => {
  //     return notes.filter(note => note.entityId.toString() === id.toString())
  //   })
  // },
}

export const schema = {typeDefs, resolvers}
