import uuid from 'uuid/v4'
import {Identifier} from './Identifier'

export class EntityId extends Identifier<string | number> {
  private constructor(id?: string | number) {
    super(id ? id : uuid())
  }

  public static create(id?: string | number) {
    return new EntityId(id)
  }
}
