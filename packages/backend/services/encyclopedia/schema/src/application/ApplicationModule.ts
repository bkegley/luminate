import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {GraphQLFederationModule} from '@nestjs/graphql'
import {InfraModule} from '../infra/InfraModule'
import {CoffeeResolvers, CountryResolvers, FarmResolvers, RegionResolvers, VarietyResolvers} from './schema'
import {
  CreateCoffeeCommandHandler,
  UpdateCoffeeCommandHandler,
  DeleteCoffeeCommandHandler,
  CreateFarmCommandHandler,
  DeleteFarmCommandHandler,
  UpdateFarmCommandHandler,
  CreateVarietyCommandHandler,
  DeleteVarietyCommandHandler,
  UpdateVarietyCommandHandler,
} from './commands'
import {
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetFarmQueryHandler,
  GetRegionQueryHandler,
  GetVarietyQueryHandler,
  ListVarietiesQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListRegionsQueryHandler,
} from './queries'

const resolvers = [CoffeeResolvers, CountryResolvers, FarmResolvers, RegionResolvers, VarietyResolvers]

const queryHandlers = [
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetFarmQueryHandler,
  GetRegionQueryHandler,
  GetVarietyQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListRegionsQueryHandler,
  ListVarietiesQueryHandler,
]
const commandHandlers = [
  CreateCoffeeCommandHandler,
  UpdateCoffeeCommandHandler,
  DeleteCoffeeCommandHandler,
  CreateFarmCommandHandler,
  DeleteFarmCommandHandler,
  UpdateFarmCommandHandler,
  CreateVarietyCommandHandler,
  DeleteVarietyCommandHandler,
  UpdateVarietyCommandHandler,
]

@Module({
  imports: [
    CqrsModule,
    InfraModule,
    GraphQLFederationModule.forRoot({
      typePaths: ['./src/application/schema/*.graphql'],
      context: ({req, res}) => {
        return {
          headers: req.headers,
          req,
          res,
        }
      },
    }),
  ],
  providers: [...resolvers, ...queryHandlers, ...commandHandlers],
})
export class ApplicationModule {}
