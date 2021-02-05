import 'reflect-metadata'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './AppModule'
import {KafkaClient, Producer} from 'kafka-node'

const PORT = process.env.PORT || 3003

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const client = new KafkaClient({
    kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
    autoConnect: true,
    connectTimeout: 1000,
  })

  await new Promise<Producer>((resolve, reject) => {
    client.createTopics(
      [
        {topic: 'brewers', partitions: 1, replicationFactor: 1},
        {topic: 'brewGuides', partitions: 1, replicationFactor: 1},
        {topic: 'brewingSessions', partitions: 1, replicationFactor: 1},
        {topic: 'evaluations', partitions: 1, replicationFactor: 1},
        {topic: 'grinders', partitions: 1, replicationFactor: 1},
        {topic: 'recipes', partitions: 1, replicationFactor: 1},
      ],
      async err => {
        if (err) {
          console.error({err})
          reject(err)
        }
        const producer = new Producer(client)
        resolve(producer)
      },
    )
  })
  await app.listen(PORT)
  console.log(`App is listening on url ${await app.getUrl()}`)
}

bootstrap()
