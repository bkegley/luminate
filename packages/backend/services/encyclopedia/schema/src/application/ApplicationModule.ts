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
  DeleteCoffeeCommandHandler,
  DeleteFarmCommandHandler,
  DeletePostCommandHandler,
  DeleteVarietyCommandHandler,
  UpdateCoffeeCommandHandler,
  UpdateFarmCommandHandler,
  UpdatePostCommandHandler,
  UpdateVarietyCommandHandler,
} from './commands'
import {
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetFarmQueryHandler,
  GetPostQueryHandler,
  GetRegionQueryHandler,
  GetVarietyQueryHandler,
  ListVarietiesQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListPostsQueryHandler,
  ListRegionsQueryHandler,
} from './queries'
import {parseTokenFromRequest} from '@luminate/graphql-utils'

const resolvers = [CoffeeResolvers, CountryResolvers, FarmResolvers, PostResolvers, RegionResolvers, VarietyResolvers]

const queryHandlers = [
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetFarmQueryHandler,
  GetPostQueryHandler,
  GetRegionQueryHandler,
  GetVarietyQueryHandler,
  ListVarietiesQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListPostsQueryHandler,
  ListRegionsQueryHandler,
]
const commandHandlers = [
  CreateCoffeeCommandHandler,
  CreateFarmCommandHandler,
  CreatePostCommandHandler,
  CreateVarietyCommandHandler,
  DeleteCoffeeCommandHandler,
  DeleteFarmCommandHandler,
  DeletePostCommandHandler,
  DeleteVarietyCommandHandler,
  UpdateCoffeeCommandHandler,
  UpdateFarmCommandHandler,
  UpdatePostCommandHandler,
  UpdateVarietyCommandHandler,
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
