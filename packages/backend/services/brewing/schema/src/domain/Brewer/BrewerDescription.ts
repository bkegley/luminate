import {Entity} from '@luminate/services-shared'

export interface BrewerDescriptionAttributes {
  value: string
}

export class BrewerDescription extends Entity<BrewerDescriptionAttributes> {
  private constructor(attrs: BrewerDescriptionAttributes) {
    super(attrs)
  }

  get value() {
    return this.attrs.value
  }

  public static create(attrs: BrewerDescriptionAttributes) {
    return new BrewerDescription(attrs)
  }
}
