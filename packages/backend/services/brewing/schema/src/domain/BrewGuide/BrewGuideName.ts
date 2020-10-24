import {Entity} from '../../shared'

export interface BrewGuideNameAttributes {
  value: string
}

export class BrewGuideName extends Entity<BrewGuideNameAttributes> {
  public get value() {
    return this.attrs.value
  }

  public static create(attrs: BrewGuideNameAttributes) {
    return new BrewGuideName(attrs)
  }
}
