import {
  AccountService,
  CoffeeService,
  CountryService,
  CuppingSessionService,
  DeviceService,
  FarmService,
  NoteService,
  PersonService,
  RegionService,
  RoleService,
  UserService,
  VarietyService,
  Token,
} from '@luminate/mongo'
import {parseUserFromRequest} from './auth'

export class ContextBuilder {
  private context: any = {services: {}, user: null}

  private user: Token | null = null

  constructor(req: any) {
    this.user = parseUserFromRequest(req)
  }

  public build() {
    return this.context
  }

  public withAccount() {
    const account = new AccountService()
    account.loadUser(this.user)
    this.context.services.account = account
    return this
  }

  public withCoffee() {
    const coffee = new CoffeeService()
    coffee.loadUser(this.user)
    this.context.services.coffee = coffee
    return this
  }

  public withCountry() {
    const country = new CountryService()
    // country.loadUser(this.user)
    this.context.services.country = country
    return this
  }

  public withCuppingSession() {
    const cuppingSession = new CuppingSessionService()
    cuppingSession.loadUser(this.user)
    this.context.services.cuppingSession = cuppingSession
    return this
  }

  public withDevice() {
    const device = new DeviceService()
    device.loadUser(this.user)
    this.context.services.device = device
    return this
  }

  public withFarm() {
    const farm = new FarmService()
    farm.loadUser(this.user)
    this.context.services.farm = farm
    return this
  }

  public withNote() {
    const note = new NoteService()
    note.loadUser(this.user)
    this.context.services.note = note
    return this
  }

  public withPerson() {
    const person = new PersonService()
    person.loadUser(this.user)
    this.context.services.person = person
    return this
  }

  public withRegion() {
    const region = new RegionService()
    // region.loadUser(this.user)
    this.context.services.region = region
    return this
  }

  public withRole() {
    const role = new RoleService()
    role.loadUser(this.user)
    this.context.services.role = role
    return this
  }

  public withUser() {
    const user = new UserService()
    user.loadUser(this.user)
    this.context.services.user = user
    return this
  }

  public withVariety() {
    const variety = new VarietyService()
    variety.loadUser(this.user)
    this.context.services.variety = variety
    return this
  }
}
