import {v4 as uuid} from 'uuid'
import {Identifier} from './Identifier'

export class EntityId extends Identifier<string | number> {
  private constructor(id?: string | number) {
    super(id ? id : uuid())
  }

  public static create(id?: string | number) {
    return new EntityId(id)
  }
}