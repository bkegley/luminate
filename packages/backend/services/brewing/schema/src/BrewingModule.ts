import 'reflect-metadata'
import {NestFactory} from '@nestjs/core'
import {Module} from '@nestjs/common'
import {CqrsModule, ICommandBus} from '@nestjs/cqrs'
import {GraphQLModule, GraphQLSchemaHost} from '@nestjs/graphql'

import {CreateBrewerCommandHandler} from './application/commands/Brewer/CreateBrewer'
const CommandHandlers = [CreateBrewerCommandHandler]
const EventHandlers: any[] = []

class Thing {
  constructor(private commandBus: ICommandBus) {}

  public doThing() {
    console.log(this.commandBus)
  }
}

@Module({
  imports: [CqrsModule, GraphQLModule.forRoot({typePaths: ['./schema/*.graphql']})],
  providers: [...CommandHandlers, ...EventHandlers, Thing],
})
export class BrewingModule {}

async function bootstrap() {
  const app = await NestFactory.create(BrewingModule)
  await app.listen(3000)
  console.log(`App is listening on url ${await app.getUrl()}`)
}

bootstrap()
