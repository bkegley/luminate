import {PostAggregate, PostAggregateAttributes} from '../../domain/Post/Post'
import {PostContent} from '../../domain/Post/PostContent'
import {EntityId} from '@luminate/services-shared'
import {IPostDTO} from '../dtos'

export class PostMapper {
  public static toAttrs(obj: any) {
    const attrs: PostAggregateAttributes = {
      title: obj.title,
      content: PostContent.create(obj.content),
    }

    return attrs
  }

  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = PostMapper.toAttrs(obj)

    const post = PostAggregate.create(attrs, id ? EntityId.create(id) : null)
    return post
  }

  public static toPersistence(post: PostAggregate) {
    return {
      _id: post.getEntityId().toString(),
      title: post.title,
      content: post.content.toString(),
    }
  }

  public static toDTO(post: PostAggregate): IPostDTO {
    const now = new Date()
    return {
      id: post.getEntityId().toString(),
      title: post.title,
      content: post.content.toString(),
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
