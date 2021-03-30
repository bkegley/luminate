import {AggregateRoot, EntityId} from '@luminate/services-shared'
import {PostContent} from './PostContent'
import {PostRelation} from './PostRelation'

export interface PostAggregateAttributes {
  title: string
  content: PostContent
  relations?: PostRelation[]
}

export class PostAggregate extends AggregateRoot<PostAggregateAttributes> {
  public get title() {
    return this.attrs.title
  }

  public get content() {
    return this.attrs.content
  }

  public get relations() {
    return this.attrs.relations
  }

  public update(attrs: Partial<PostAggregateAttributes>) {
    if (attrs.title) {
      this.attrs.title = attrs.title
    }

    if (attrs.content) {
      this.attrs.content = attrs.content
    }

    if (attrs.relations) {
      this.attrs.relations = attrs.relations
    }
    // TODO: register updated event
  }

  public togglePin(entityId: EntityId) {
    const {updatedPost, posts} = this.attrs.relations?.reduce(
      (acc, relation) => {
        if (relation.id.toString() === entityId.toString()) {
          acc.updatedPost = relation
          return acc
        }
        acc.posts.push(relation)
        return acc
      },
      {updatedPost: undefined, posts: [] as PostRelation[]},
    )

    if (!updatedPost) {
      throw new Error('Post not found for entity')
    }

    this.attrs.relations = posts.concat(
      PostRelation.create({type: updatedPost.type, pinned: !updatedPost.pinned}, updatedPost.id),
    )

    // TODO: register PinToggled event
  }

  public static create(attrs: PostAggregateAttributes, id?: EntityId) {
    const isNew = !id

    if (isNew) {
      // TODO: register created event
    }

    return new PostAggregate(attrs, id)
  }
}
