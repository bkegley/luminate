import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {GraphQLFederationModule} from '@nestjs/graphql'
import {InfraModule} from '../infra/InfraModule'
import {CoffeeResolvers} from './schema/Coffee'
import {CreateCoffeeCommandHandler} from './commands'
import {GetCoffeeQueryHandler, ListCoffeesQueryHandler} from './queries'

const resolvers = [CoffeeResolvers]
const queryHandlers = [GetCoffeeQueryHandler, ListCoffeesQueryHandler]
const commandHandlers = [CreateCoffeeCommandHandler]

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
