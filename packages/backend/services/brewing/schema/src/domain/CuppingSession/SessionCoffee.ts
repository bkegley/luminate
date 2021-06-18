import {Entity, EntityId} from '@luminate/services-shared'

export interface SessionCoffeeAttrs {
  sampleNumber: string
  coffeeId: EntityId
  scoresheets?: any
}

export class SessionCoffee extends Entity<SessionCoffeeAttrs> {
  public get id() {
    return this._id
  }

  public get sampleNumber() {
    return this.attrs.sampleNumber
  }

  public get coffeeId() {
    return this.attrs.coffeeId
  }

  public get scoresheets() {
    return this.attrs.scoresheets
  }

  public static create(attrs: SessionCoffeeAttrs, id?: EntityId) {
    return new SessionCoffee(attrs, id)
  }
}
