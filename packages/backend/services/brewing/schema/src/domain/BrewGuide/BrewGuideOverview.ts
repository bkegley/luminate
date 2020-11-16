import {Entity} from '../../shared'

export interface BrewGuideOverviewAttributes {
  value: string
}

export class BrewGuideOverview extends Entity<BrewGuideOverviewAttributes> {
  private constructor(attrs: BrewGuideOverviewAttributes) {
    super(attrs)
  }

  public get value() {
    return this.attrs.value
  }

  public static create(attrs: BrewGuideOverviewAttributes) {
    return new BrewGuideOverview(attrs)
  }
}
