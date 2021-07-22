import {Module} from '@nestjs/common'
import {ModelModule} from '../models/ModelModule'
import {
  AccountsRepo,
  BrewGuidesRepo,
  BrewersRepo,
  BrewingSessionsRepo,
  CoffeesRepo,
  CountriesRepo,
  CuppingSessionsRepo,
  EvaluationsRepo,
  FarmsRepo,
  GrindersRepo,
  PostsRepo,
  RecipesRepo,
  RefreshTokensRepo,
  RegionsRepo,
  RolesRepo,
  UsersRepo,
  VarietiesRepo,
  ViewsRepo,
} from '.'

const repos = [
  AccountsRepo,
  BrewGuidesRepo,
  BrewersRepo,
  BrewingSessionsRepo,
  CoffeesRepo,
  CountriesRepo,
  CuppingSessionsRepo,
  EvaluationsRepo,
  FarmsRepo,
  GrindersRepo,
  PostsRepo,
  RecipesRepo,
  RefreshTokensRepo,
  RegionsRepo,
  RolesRepo,
  UsersRepo,
  VarietiesRepo,
  ViewsRepo,
]

@Module({
  imports: [ModelModule],
  providers: repos,
  exports: repos,
})
export class RepoModule {}
