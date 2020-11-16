import {Entity, EntityId} from '../../shared'

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
