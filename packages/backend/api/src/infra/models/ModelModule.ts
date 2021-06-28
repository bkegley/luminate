import {Module} from '@nestjs/common'
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

const mongoUrl = process.env.DB_URL || `mongodb://localhost:27017/luminate`

const schemas = MongooseModule.forFeature([
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

@Module({
  imports: [MongooseModule.forRoot(mongoUrl, {useFindAndModify: false}), schemas],
  exports: [schemas],
})
export class ModelModule {}
