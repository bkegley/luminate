import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {
  AccountSchema,
  BrewGuideSchema,
  BrewerSchema,
  BrewingSessionSchema,
  CoffeeSchema,
  CountrySchema,
  CuppingSessionSchema,
  EvaluationSchema,
  FarmSchema,
  GrinderSchema,
  PersonSchema,
  PostSchema,
  RecipeSchema,
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
    name: 'brewGuide',
    schema: BrewGuideSchema,
  },
  {
    name: 'brewer',
    schema: BrewerSchema,
  },
  {
    name: 'brewingSession',
    schema: BrewingSessionSchema,
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
    name: 'cuppingSession',
    schema: CuppingSessionSchema,
  },
  {
    name: 'evaluation',
    schema: EvaluationSchema,
  },
  {
    name: 'farm',
    schema: FarmSchema,
  },
  {
    name: 'grinder',
    schema: GrinderSchema,
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
    name: 'recipe',
    schema: RecipeSchema,
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
