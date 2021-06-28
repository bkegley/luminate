import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {GraphQLModule} from '@nestjs/graphql'
import {InfraModule} from '../infra/InfraModule'
import {CommandModule} from './commands/CommandModule'
import {QueryModule} from './queries/QueryModule'
import {SchemaModule} from './schema/SchemaModule'

@Module({
  imports: [
    CqrsModule,
    GraphQLModule.forRoot({typePaths: ['./src/application/schema/*.graphql']}),
    InfraModule,
    CommandModule,
    QueryModule,
    SchemaModule,
  ],
  exports: [CommandModule, QueryModule, SchemaModule],
})
export class ApplicationModule {}
