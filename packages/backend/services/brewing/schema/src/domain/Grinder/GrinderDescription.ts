import {Entity} from '../../shared'

export interface GrinderDescriptionAttributes {
  value: string
}

export class GrinderDescription extends Entity<GrinderDescriptionAttributes> {
  get value() {
    return this.attrs.value
  }

  public static create(attrs: GrinderDescriptionAttributes) {
    return new GrinderDescription(attrs)
  }
}
