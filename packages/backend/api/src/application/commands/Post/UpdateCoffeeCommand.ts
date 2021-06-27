import {Token} from '@luminate/mongo-utils'
import {EntityRelation, UpdatePostInput} from '../../../types'

export class UpdatePostCommand {
  title: string
  content: string
  relations?: EntityRelation[]

  constructor(public user: Token, public id: string, input: UpdatePostInput) {
    this.title = input.title
    this.content = input.content
    this.relations = input.relations
  }
}
