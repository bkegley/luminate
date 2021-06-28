import {MongooseModule} from '@nestjs/mongoose'
import {
  AccountSchema,
  CoffeeSchema,
  CountrySchema,
  FarmSchema,
  PersonSchema,
  PostSchema,
  RefreshTokenSchema,
  RegionSchema,
  RoleSchema,
  UserSchema,
  VarietySchema,
  ViewSchema,
} from '.'

export const schemas = MongooseModule.forFeature([
  {
    name: 'account',
    schema: AccountSchema,
  },
  {
    name: 'coffee',
    schema: CoffeeSchema,
  },
  {
    name: 'country',
    schema: CountrySchema,
  },
  {
    name: 'farm',
    schema: FarmSchema,
  },
  {
    name: 'person',
    schema: PersonSchema,
  },
  {
    name: 'post',
    schema: PostSchema,
  },
  {
    name: 'refreshToken',
    schema: RefreshTokenSchema,
  },
  {
    name: 'region',
    schema: RegionSchema,
  },
  {
    name: 'role',
    schema: RoleSchema,
  },
  {
    name: 'user',
    schema: UserSchema,
  },
  {
    name: 'variety',
    schema: VarietySchema,
  },
  {
    name: 'view',
    schema: ViewSchema,
  },
])
