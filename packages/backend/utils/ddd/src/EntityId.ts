import {Identifier} from './Identifier'
import {Types} from 'mongoose'

export class EntityId extends Identifier<string> {
  private constructor(id?: string) {
    super(id ? id : new Types.ObjectId().toHexString())
  }

  public get value() {
    return this.toString()
  }

  public get id() {
    return this.toString()
  }

  public static create(id?: string) {
    return new EntityId(id)
  }
}
