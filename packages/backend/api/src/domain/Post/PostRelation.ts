import {Entity, EntityId} from '@luminate/ddd'
import {EntityType} from '../../types'

export interface PostRelationAttributes {
  type: EntityType
  pinned: Boolean
}

export class PostRelation extends Entity<PostRelationAttributes> {
  public get type() {
    return this.attrs.type
  }

  public get pinned() {
    return this.attrs.pinned
  }

  public get id() {
    return this._id
  }

  public static create(attrs: PostRelationAttributes, id: EntityId) {
    return new PostRelation(attrs, id)
  }
}
