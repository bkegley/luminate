import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'
import {schemas} from './schema'
import {createMongoConnection, Token} from '@luminate/mongo-utils'
import {Container} from './utils'
import {parseUserFromRequest} from '@luminate/graphql-utils'
import {ICommandRegistry, CommandRegistry} from './commands'
import {TYPES} from './utils'
import {Producer, KafkaClient} from 'kafka-node'
import {BrewersView, IBrewersView} from './views'

export interface Context {
  services: any
  container: Container
}

class Server {
  private app = express()
  private port = process.env.PORT || 3003
  private container = new Container()

  public async start() {
    await createMongoConnection(process.env.MONGO_URL)

    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    await new Promise<Producer>((resolve, reject) => {
      client.createTopics([{topic: 'brewers', partitions: 1, replicationFactor: 1}], async err => {
        if (err) {
          console.error({err})
          reject(err)
        }
        const producer = new Producer(client)

        this.container.bind<Producer>(TYPES.KafkaProducer, producer)
        resolve(producer)
      })
    })

    this.container.bind<IBrewersView>(TYPES.BrewersView, new BrewersView())

    this.container.bind<ICommandRegistry>(
      TYPES.CommandRegistry,
      resolver => new CommandRegistry(resolver.resolve(TYPES.KafkaProducer)),
    )

    const server = new ApolloServer({
      schema: buildFederatedSchema(schemas),
      context: ({req}) => {
        return {
          container: this.container,
        }
      },
      introspection: true,
      engine: false,
      playground:
        process.env.NODE_ENV === 'production'
          ? false
          : {
              settings: {
                'request.credentials': 'include',
              },
            },
    })

    server.applyMiddleware({app: this.app, cors: true})

    this.app.listen({port: this.port}, () =>
      console.log(`🚀 Server ready at http://localhost:${this.port}${server.graphqlPath}`),
    )
  }

  private registerServices() {}
}

const server = new Server()
server.start()
