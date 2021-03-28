import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IPostsRepo} from './IPostsRepo'
import {PostDocument} from '../models'
import {PostMapper} from '../mappers/PostMapper'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {PostAggregate} from '../../domain/Post/Post'

@Injectable()
export class PostsRepo extends AuthenticatedRepo<PostDocument> implements IPostsRepo {
  constructor(@InjectModel('post') private postModel: Model<PostDocument>) {
    super(postModel)
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