import Account, {AccountDocument, AccountModel} from './Account'
import Coffee, {CoffeeDocument, CoffeeModel} from './Coffee'
import Country, {CountryDocument, CountryModel} from './Country'
import CuppingSession, {
  CuppingSessionDocument,
  SessionCoffeeDocument,
  CuppingSessionModel,
  ScoreSheetDocument,
} from './CuppingSession'
import Device, {DeviceDocument, DeviceModel} from './Device'
import Farm, {FarmDocument, FarmModel} from './Farm'
import {Person, User, PersonDocument, PersonModel, UserDocument, UserModel} from './Person'
import Region, {RegionDocument, RegionModel} from './Region'
import Role, {RoleDocument, RoleModel} from './Role'
import Variety, {VarietyDocument, VarietyModel} from './Variety'

export const models = {
  Account,
  Coffee,
  Country,
  CuppingSession,
  Device,
  Farm,
  Person,
  Region,
  Role,
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
  CuppingSessionDocument,
  CuppingSessionModel,
  DeviceDocument,
  DeviceModel,
  FarmDocument,
  FarmModel,
  PersonDocument,
  PersonModel,
  UserDocument,
  UserModel,
  RegionDocument,
  RegionModel,
  RoleDocument,
  RoleModel,
  SessionCoffeeDocument,
  ScoreSheetDocument,
  VarietyDocument,
  VarietyModel,
}
