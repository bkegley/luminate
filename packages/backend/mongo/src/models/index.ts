import {AccountDocument, AccountModel} from './Account'
import {CoffeeDocument, CoffeeModel} from './Coffee'
import {CountryDocument, CountryModel} from './Country'
import {CuppingSessionDocument, SessionCoffeeDocument, CuppingSessionModel, ScoreSheetDocument} from './CuppingSession'
import {DeviceDocument, DeviceModel} from './Device'
import {FarmDocument, FarmModel} from './Farm'
import {NoteDocument, NoteModel} from './Note'
import {PersonDocument, PersonModel, UserDocument, UserModel} from './Person'
import {RegionDocument, RegionModel} from './Region'
import {RoleDocument, RoleModel} from './Role'
import {VarietyDocument, VarietyModel} from './Variety'

export const models = {
  Account: AccountModel,
  Coffee: CoffeeModel,
  Country: CountryModel,
  CuppingSession: CuppingSessionModel,
  Device: DeviceModel,
  Farm: FarmModel,
  Note: NoteModel,
  Person: PersonModel,
  Region: RegionModel,
  Role: RoleModel,
  User: UserModel,
  Variety: VarietyModel,
}

export {
  AccountDocument,
  CoffeeDocument,
  CountryDocument,
  CuppingSessionDocument,
  DeviceDocument,
  FarmDocument,
  NoteDocument,
  PersonDocument,
  UserDocument,
  RegionDocument,
  RoleDocument,
  SessionCoffeeDocument,
  ScoreSheetDocument,
  VarietyDocument,
}
