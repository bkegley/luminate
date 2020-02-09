import Account, {AccountDocument, AccountModel} from './Account'
import Coffee, {CoffeeDocument, CoffeeModel} from './Coffee'
import Country, {CountryDocument, CountryModel} from './Country'
import Cupping, {CuppingDocument, CoffeeCuppingDocument, CuppingModel} from './Cupping'
import Farm, {FarmDocument, FarmModel} from './Farm'
import FarmZone, {FarmZoneDocument, FarmZoneModel} from './FarmZone'
import {Person, User, PersonDocument, PersonModel, UserDocument, UserModel, AuthenticatedUserDocument} from './Person'
import Region, {RegionDocument, RegionModel} from './Region'
import Roast, {RoastDocument, RoastModel} from './Roast'
import Role, {RoleDocument, RoleModel} from './Role'
import Scope, {ScopeDocument, ScopeModel} from './Scope'
import Variety, {VarietyDocument, VarietyModel} from './Variety'

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
  AccountModel,
  CoffeeDocument,
  CoffeeModel,
  CountryDocument,
  CountryModel,
  CuppingDocument,
  CuppingModel,
  CoffeeCuppingDocument,
  FarmDocument,
  FarmModel,
  FarmZoneDocument,
  FarmZoneModel,
  PersonDocument,
  PersonModel,
  UserDocument,
  UserModel,
  AuthenticatedUserDocument,
  RegionDocument,
  RegionModel,
  RoastDocument,
  RoastModel,
  RoleDocument,
  RoleModel,
  ScopeDocument,
  ScopeModel,
  VarietyDocument,
  VarietyModel,
}
