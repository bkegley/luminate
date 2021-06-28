import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {InfraModule} from '../../infra/InfraModule'
import {
  GetAccountQueryHandler,
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetEntityPostsQueryHandler,
  GetFarmQueryHandler,
  GetMeQueryHandler,
  GetPostQueryHandler,
  GetRegionQueryHandler,
  GetRoleQueryHandler,
  GetUserQueryHandler,
  GetVarietyQueryHandler,
  GetViewQueryHandler,
  ListAccountsQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListPostsQueryHandler,
  ListRegionsQueryHandler,
  ListRolesQueryHandler,
  ListUsersQueryHandler,
  ListVarietiesQueryHandler,
  ListViewsQueryHandler,
} from '.'

const handlers = [
  GetAccountQueryHandler,
  GetCoffeeQueryHandler,
  GetCountryQueryHandler,
  GetEntityPostsQueryHandler,
  GetFarmQueryHandler,
  GetMeQueryHandler,
  GetPostQueryHandler,
  GetRegionQueryHandler,
  GetRoleQueryHandler,
  GetUserQueryHandler,
  GetVarietyQueryHandler,
  GetViewQueryHandler,
  ListAccountsQueryHandler,
  ListCoffeesQueryHandler,
  ListCountriesQueryHandler,
  ListFarmsQueryHandler,
  ListPostsQueryHandler,
  ListRegionsQueryHandler,
  ListRolesQueryHandler,
  ListUsersQueryHandler,
  ListVarietiesQueryHandler,
  ListViewsQueryHandler,
]

@Module({
  imports: [CqrsModule, InfraModule],
  providers: handlers,
  exports: handlers,
})
export class QueryModule {}
