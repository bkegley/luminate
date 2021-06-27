import {Token} from '@luminate/mongo-utils'
import {CreatePostInput, EntityRelationInput} from '../../../types'

export class CreatePostCommand {
  title: string
  content: string
  relations?: EntityRelationInput[]

  constructor(public user: Token, input: CreatePostInput) {
    this.title = input.title
    this.content = input.content
    this.relations = input.relations
  }
}
