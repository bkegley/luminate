import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {GraphQLFederationModule} from '@nestjs/graphql'
import {InfraModule} from '../infra/InfraModule'
import {
  CoffeeResolvers,
  CountryResolvers,
  FarmResolvers,
  PostResolvers,
  RegionResolvers,
  VarietyResolvers,
} from './schema'
import {
  CreateCoffeeCommandHandler,
  CreateFarmCommandHandler,
  CreatePostCommandHandler,
  CreateVarietyCommandHandler,
  CreateViewCommandHandler,
  DeleteCoffeeCommandHandler,
  DeleteFarmCommandHandler,
  DeletePostCommandHandler,
  DeleteVarietyCommandHandler,
  DeleteViewCommandHandler,
  TogglePostPinCommandHandler,
  UpdateCoffeeCommandHandler,
  UpdateFarmCommandHandler,
  UpdatePostCommandHandler,
  UpdateVarietyCommandHandler,
  UpdateViewCommandHandler,
} from './commands'
import {
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetFarmQueryHandler,
  GetPostQueryHandler,
  GetEntityPostsQueryHandler,
  GetRegionQueryHandler,
  GetVarietyQueryHandler,
  GetViewQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListPostsQueryHandler,
  ListRegionsQueryHandler,
  ListVarietiesQueryHandler,
  ListViewsQueryHandler,
} from './queries'
import {parseTokenFromRequest} from '@luminate/graphql-utils'
import {ViewResolvers} from './schema/View'

const resolvers = [
  CoffeeResolvers,
  CountryResolvers,
  FarmResolvers,
  PostResolvers,
  RegionResolvers,
  VarietyResolvers,
  ViewResolvers,
]

const queryHandlers = [
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetFarmQueryHandler,
  GetPostQueryHandler,
  GetEntityPostsQueryHandler,
  GetRegionQueryHandler,
  GetVarietyQueryHandler,
  GetViewQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListPostsQueryHandler,
  ListRegionsQueryHandler,
  ListVarietiesQueryHandler,
  ListViewsQueryHandler,
]
const commandHandlers = [
  CreateCoffeeCommandHandler,
  CreateFarmCommandHandler,
  CreatePostCommandHandler,
  CreateVarietyCommandHandler,
  CreateViewCommandHandler,
  DeleteCoffeeCommandHandler,
  DeleteFarmCommandHandler,
  DeletePostCommandHandler,
  DeleteVarietyCommandHandler,
  DeleteViewCommandHandler,
  TogglePostPinCommandHandler,
  UpdateCoffeeCommandHandler,
  UpdateFarmCommandHandler,
  UpdatePostCommandHandler,
  UpdateVarietyCommandHandler,
  UpdateViewCommandHandler,
]

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'supersecretpassword'

@Module({
  imports: [
    CqrsModule,
    InfraModule,
    GraphQLFederationModule.forRoot({
      typePaths: ['./src/application/schema/*.graphql'],
      context: ({req, res}) => {
        let user
        try {
          user = parseTokenFromRequest(req, USER_AUTH_TOKEN)
        } catch {}
        return {
          user,
          req,
          res,
        }
      },
    }),
  ],
  providers: [...resolvers, ...queryHandlers, ...commandHandlers],
})
export class ApplicationModule {}
