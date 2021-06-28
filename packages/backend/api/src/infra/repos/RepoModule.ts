import {Module} from '@nestjs/common'
import {ModelModule} from '../models/ModelModule'
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
} from '.'

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

@Module({
  imports: [ModelModule],
  providers: repos,
  exports: repos,
})
export class RepoModule {}
