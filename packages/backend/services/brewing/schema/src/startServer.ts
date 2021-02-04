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
import {
  BrewersView,
  IBrewersView,
  IGrindersView,
  GrindersView,
  BrewGuidesView,
  IBrewGuidesView,
  EvaluationsView,
  IEvaluationsView,
  IBrewingSessionsView,
  BrewingSessionsView,
} from './views'
import {EventRegistry, IEventRegistry} from './infra'
import {
  IBrewerRepository,
  InMemoryBrewerRepository,
  IBrewGuideRepository,
  InMemoryBrewGuideRepository,
  InMemoryRecipeRepository,
  IRecipeRepository,
  InMemoryEvaluationRepository,
  IEvaluationRepository,
} from './repositories'
import {InMemoryGrinderRepository} from './repositories/GrinderRepository'
import {IGrinderRepository} from './repositories/IGrinderRepository'
import {InMemoryBrewingSessionRepository} from './repositories/BrewingSessionRepository'
import {IBrewingSessionRepository} from './repositories/IBrewingSessionRepository'

import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'

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

          this.container.bind<Producer>(TYPES.KafkaProducer, producer)
          resolve(producer)
        },
      )
    })

    const brewerRepository = new InMemoryBrewerRepository()
    this.container.bind<IBrewersView>(TYPES.BrewersView, new BrewersView())
    this.container.bind<IBrewerRepository>(TYPES.BrewerRepository, brewerRepository)

    const brewGuideRepository = new InMemoryBrewGuideRepository()
    this.container.bind<IBrewGuidesView>(TYPES.BrewGuidesView, new BrewGuidesView())
    this.container.bind<IBrewGuideRepository>(TYPES.BrewGuideRepository, brewGuideRepository)

    const brewingSessionRepository = new InMemoryBrewingSessionRepository()
    this.container.bind<IBrewingSessionRepository>(TYPES.BrewingSessionRepository, brewingSessionRepository)
    this.container.bind<IBrewingSessionsView>(TYPES.BrewingSessionsView, new BrewingSessionsView())

    const evaluationRepository = new InMemoryEvaluationRepository()
    this.container.bind<IEvaluationRepository>(TYPES.EvaluationRepository, evaluationRepository)
    this.container.bind<IEvaluationsView>(TYPES.EvaluationsView, new EvaluationsView())

    const grinderRepository = new InMemoryGrinderRepository()
    this.container.bind<IGrindersView>(TYPES.GrindersView, new GrindersView())
    this.container.bind<IGrinderRepository>(TYPES.GrinderRepository, grinderRepository)

    const recipeRepository = new InMemoryRecipeRepository()
    this.container.bind<IRecipeRepository>(TYPES.RecipeRepository, recipeRepository)

    this.container.bind<ICommandRegistry>(
      TYPES.CommandRegistry,
      resolver =>
        new CommandRegistry(
          resolver.resolve(TYPES.EventRegistry),
          resolver.resolve(TYPES.BrewerRepository),
          resolver.resolve(TYPES.BrewGuideRepository),
          resolver.resolve(TYPES.BrewingSessionRepository),
          resolver.resolve(TYPES.EvaluationRepository),
          resolver.resolve(TYPES.GrinderRepository),
          resolver.resolve(TYPES.RecipeRepository),
        ),
    )

    this.container.bind<IEventRegistry>(
      TYPES.EventRegistry,
      resolver => new EventRegistry(resolver.resolve(TYPES.KafkaProducer)),
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
