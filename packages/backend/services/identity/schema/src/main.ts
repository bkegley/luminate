import {NestFactory} from '@nestjs/core'
import {CommandBus} from '@nestjs/cqrs'
import {CreateOwnerRoleCommand} from './application/commands'
import {AppModule} from './AppModule'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  await app.listen(port)
  console.log(`App listening on ${await app.getUrl()}`)

  const commandBus = app.get(CommandBus)
  const command = new CreateOwnerRoleCommand()
  await commandBus.execute(command)
}

bootstrap()
