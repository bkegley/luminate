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
} from './models'
import {
  AccountsRepo,
  CoffeesRepo,
  CountriesRepo,
  FarmsRepo,
  PostsRepo,
  RefreshTokensRepo,
  RegionsRepo,
  RolesRepo,
  UsersRepo,
  VarietiesRepo,
  ViewsRepo,
} from './repos'
import {CoffeeLoader, CountryLoader, FarmLoader, RegionLoader, VarietyLoader, ViewLoader} from './loaders'
import {CoffeeService, CountryService, TokenService} from './services'

const mongoUrl = process.env.DB_URL || `mongodb://localhost:27017/luminate-encyclopedia`

const repos = [
  AccountsRepo,
  CoffeesRepo,
  CountriesRepo,
  FarmsRepo,
  PostsRepo,
  RefreshTokensRepo,
  RegionsRepo,
  RolesRepo,
  UsersRepo,
  VarietiesRepo,
  ViewsRepo,
]

const services = [CoffeeService, CountryService, TokenService]

const loaders = [CoffeeLoader, CountryLoader, FarmLoader, RegionLoader, VarietyLoader, ViewLoader]

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, {useFindAndModify: false}),
    MongooseModule.forFeature([
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
    ]),
  ],
  providers: [...repos, ...services, ...loaders],
  exports: [...repos, ...services, ...loaders],
})
export class InfraModule {}
