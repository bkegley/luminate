import Account, {AccountDocument} from './Account'
import Coffee, {CoffeeDocument} from './Coffee'
import Country, {CountryDocument} from './Country'
import Cupping, {CuppingDocument, CoffeeCuppingDocument} from './Cupping'
import Farm, {FarmDocument} from './Farm'
import FarmZone, {FarmZoneDocument} from './FarmZone'
import {Person, User, PersonDocument, UserDocument, UserWithScopesDocument} from './Person'
import Region, {RegionDocument} from './Region'
import Roast, {RoastDocument} from './Roast'
import Role, {RoleDocument} from './Role'
import Scope, {ScopeDocument} from './Scope'
import Variety, {VarietyDocument} from './Variety'

export const models = {
  Account,
  Coffee,
  Country,
  Cupping,
  Farm,
  FarmZone,
  Person,
  Region,
  Roast,
  Role,
  Scope,
  User,
  Variety,
}

export {
  AccountDocument,
  CoffeeDocument,
  CountryDocument,
  CuppingDocument,
  CoffeeCuppingDocument,
  FarmDocument,
  FarmZoneDocument,
  PersonDocument,
  UserDocument,
  UserWithScopesDocument,
  RegionDocument,
  RoastDocument,
  RoleDocument,
  ScopeDocument,
  VarietyDocument,
}
