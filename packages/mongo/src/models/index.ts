import Coffee, {CoffeeDocument} from './Coffee'
import Country, {CountryDocument} from './Country'
import Cupping, {CuppingDocument, CoffeeCuppingDocument} from './Cupping'
import Farm, {FarmDocument} from './Farm'
import FarmZone, {FarmZoneDocument} from './FarmZone'
import {Person, User, PersonDocument, UserDocument} from './Person'
import Region, {RegionDocument} from './Region'
import Role, {RoleDocument} from './Role'
import Scope, {ScopeDocument} from './Scope'
import Variety, {VarietyDocument} from './Variety'

export const models = {Coffee, Country, Cupping, Farm, FarmZone, Person, Region, Role, Scope, User, Variety}

export {
  CoffeeDocument,
  CountryDocument,
  CuppingDocument,
  CoffeeCuppingDocument,
  FarmDocument,
  FarmZoneDocument,
  PersonDocument,
  UserDocument,
  RegionDocument,
  RoleDocument,
  ScopeDocument,
  VarietyDocument,
}
