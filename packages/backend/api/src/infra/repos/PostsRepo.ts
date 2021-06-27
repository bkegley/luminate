import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IPostsRepo} from './IPostsRepo'
import {PostDocument} from '../models'
import {PostMapper} from '../mappers/PostMapper'
import {PostAggregate} from '../../domain/Post/Post'

@Injectable()
export class PostsRepo extends AuthenticatedRepo<PostDocument> implements IPostsRepo {
  constructor(@InjectModel('post') protected postModel: Model<PostDocument>) {
    super(postModel)
  }

  listByEntityId(user: Token, id: string): Promise<PostDocument[]>
  listByEntityId(id: string): Promise<PostDocument[]>
  async listByEntityId(userOrId: Token | string, id?: string) {
    if (id) {
      return this.getConnectionResults(userOrId as Token, {
        relations: {$elemMatch: {id}},
        sortBy: {field: 'relations.pinned', descending: true},
      })
    }
    return this.getConnectionResults({relations: {$elemMatch: {id}}})
  }

  save(user: Token, post: PostAggregate): Promise<void>
  save(post: PostAggregate): Promise<void>
  public async save(userOrPost: Token | PostAggregate, post?: PostAggregate) {
    if (post) {
      const {_id, ...postObj} = PostMapper.toPersistence(post)
      await this.updateOne(userOrPost as Token, {_id}, postObj)
    } else {
      const {_id, ...postObj} = PostMapper.toPersistence(userOrPost as PostAggregate)
      await this.updateOne({_id}, postObj)
    }
  }
}
