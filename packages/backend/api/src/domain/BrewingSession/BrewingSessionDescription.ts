import {Entity, EntityId} from '@luminate/ddd'

export interface BrewingSessionDescriptionAttributes {
  value: string
}

export class BrewingSessionDescription extends Entity<BrewingSessionDescriptionAttributes> {
  public get value() {
    return this.attrs.value
  }

  public static create(attrs: BrewingSessionDescriptionAttributes, id?: EntityId) {
    return new BrewingSessionDescription(attrs, id)
  }
}
