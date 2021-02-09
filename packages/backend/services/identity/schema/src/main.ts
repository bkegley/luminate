import {NestFactory} from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory()
  await app.listen(port)

  console.log(`App listening on ${await app.getUrl()}`)
}

bootstrap()
