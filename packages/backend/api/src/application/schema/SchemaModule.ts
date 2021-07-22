import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {InfraModule} from '../../infra/InfraModule'
import {
  AccountResolvers,
  AuthResolvers,
  BrewGuideResolvers,
  BrewerResolvers,
  BrewingSessionResolvers,
  CoffeeResolvers,
  CountryResolvers,
  CuppingSessionResolvers,
  EvaluationResolvers,
  FarmResolvers,
  GrinderResolvers,
  MeResolvers,
  PostResolvers,
  RecipeResolvers,
  RegionResolvers,
  RoleResolvers,
  UserResolvers,
  VarietyResolvers,
  ViewResolvers,
} from '.'

const resolvers = [
  AccountResolvers,
  AuthResolvers,
  BrewGuideResolvers,
  BrewerResolvers,
  BrewingSessionResolvers,
  CoffeeResolvers,
  CountryResolvers,
  CuppingSessionResolvers,
  EvaluationResolvers,
  FarmResolvers,
  GrinderResolvers,
  MeResolvers,
  PostResolvers,
  RecipeResolvers,
  RegionResolvers,
  RoleResolvers,
  UserResolvers,
  VarietyResolvers,
  ViewResolvers,
]

@Module({
  imports: [CqrsModule, InfraModule],
  providers: resolvers,
  exports: resolvers,
})
export class SchemaModule {}
