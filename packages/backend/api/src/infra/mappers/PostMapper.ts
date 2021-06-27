import {PostAggregate, PostAggregateAttributes} from '../../domain/Post/Post'
import {PostContent} from '../../domain/Post/PostContent'
import {EntityId} from '@luminate/ddd'
import {IPostDTO} from '../dtos'
import {PostRelation} from '../../domain/Post/PostRelation'
import {EntityType} from '../../types'

export class PostMapper {
  public static toAttrs(obj: any) {
    const attrs: PostAggregateAttributes = {
      title: obj.title,
      content: PostContent.create(obj.content),
      relations: obj.relations
        ? obj.relations.map((relation: {type: EntityType; pinned: boolean; id: string}) =>
            PostRelation.create({type: relation.type, pinned: relation.pinned ?? false}, EntityId.create(relation.id)),
          )
        : null,
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
      relations: post.relations?.map(relation => ({
        id: relation.id.toString(),
        entity: relation.type,
        pinned: relation.pinned,
      })),
    }
  }

  public static toDTO(post: PostAggregate): IPostDTO {
    const now = new Date()
    return {
      id: post.getEntityId().toString(),
      title: post.title,
      content: post.content.toString(),
      relations: post.relations?.map(relation => ({
        id: relation.id.toString(),
        type: relation.type,
        pinned: relation.pinned,
      })),
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
