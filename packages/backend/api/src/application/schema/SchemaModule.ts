import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {InfraModule} from '../../infra/InfraModule'
import {
  AccountResolvers,
  AuthResolvers,
  CoffeeResolvers,
  CountryResolvers,
  FarmResolvers,
  MeResolvers,
  PostResolvers,
  RegionResolvers,
  RoleResolvers,
  UserResolvers,
  VarietyResolvers,
  ViewResolvers,
} from '.'

const resolvers = [
  AccountResolvers,
  AuthResolvers,
  CoffeeResolvers,
  CountryResolvers,
  FarmResolvers,
  MeResolvers,
  PostResolvers,
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
