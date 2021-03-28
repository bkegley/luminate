import {AggregateRoot, EntityId} from '@luminate/services-shared'
import {PostContent} from './PostContent'

export interface PostAggregateAttributes {
  title: string
  content: PostContent
}

export class PostAggregate extends AggregateRoot<PostAggregateAttributes> {
  public get title() {
    return this.attrs.title
  }

  public get content() {
    return this.attrs.content
  }

  public update(attrs: Partial<PostAggregateAttributes>) {
    if (attrs.title) {
      this.attrs.title = attrs.title
    }

    if (attrs.content) {
      this.attrs.content = attrs.content
    }
    // TODO: register updated event
  }

  public static create(attrs: PostAggregateAttributes, id?: EntityId) {
    const isNew = !id

    if (isNew) {
      // TODO: register created event
    }

    return new PostAggregate(attrs, id)
  }
}
