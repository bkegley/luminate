import {v4 as uuid} from 'uuid'
import {Identifier} from './Identifier'

export class EntityId extends Identifier<string | number> {
  private constructor(id?: string | number) {
    super(id ? id : uuid())
  }

  public get value() {
    return this.toString()
  }

  public get id() {
    return this.toString()
  }

  public static create(id?: string | number) {
    return new EntityId(id)
  }
}
