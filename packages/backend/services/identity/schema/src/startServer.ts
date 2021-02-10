import path from 'path'
require('dotenv').config({
  path: path.join(process.cwd(), '../..', '.env'),
})
import {ApolloServer} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import express from 'express'

//import {schemas} from './application/schema'
import {seedDatabase} from './seedDatabase'
import {Container} from './utils'
import {createMongoConnection, Token} from '@luminate/mongo-utils'
import {parseUserFromRequest} from '@luminate/graphql-utils'
import {KafkaClient, Producer} from 'kafka-node'
const PORT = process.env.PORT || 3001
import {TYPES} from './utils/types'
//import {ICommandRegistry, CommandRegistry} from './application/commands'
import {
  IRolesProjection,
  RolesProjection,
  AccountsProjection,
  UsersProjection,
  IAccountsProjection,
  IUsersProjection,
} from './infra/projections'
//import {AccountsRepo, IAccountsRepo, IUsersRepo, IRolesRepo, RolesRepo, UsersRepo} from './infra/repos'

export interface Context {
  res: express.Response
  container: Container
  user: Token | null
}

class Server {
  private app = express()
  private port = process.env.PORT || 3001
  private container = new Container()

  public async start() {
    await createMongoConnection(process.env.MONGO_URL)
    await seedDatabase({})

    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    await new Promise<Producer>((resolve, reject) => {
      client.createTopics(
        [
          {topic: 'accounts', partitions: 1, replicationFactor: 1},
          {topic: 'users', partitions: 1, replicationFactor: 1},
          {topic: 'roles', partitions: 1, replicationFactor: 1},
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

    //this.container.bind<IAccountsRepo>(TYPES.AccountsRepo, () => new AccountsRepo())
    //this.container.bind<IUsersRepo>(TYPES.UsersRepo, () => new UsersRepo())
    //this.container.bind<IRolesRepo>(TYPES.RolesRepo, () => new RolesRepo())

    const accountsProjection = new AccountsProjection()
    const usersProjection = new UsersProjection()
    const rolesProjection = new RolesProjection()

    this.container.bind<IAccountsProjection>(TYPES.AccountsProjection, accountsProjection)
    this.container.bind<IUsersProjection>(TYPES.UsersProjection, usersProjection)
    this.container.bind<IRolesProjection>(TYPES.RolesProjection, rolesProjection)

    //this.container.bind<ICommandRegistry>(
    //TYPES.CommandRegistry,
    //resolver =>
    //new CommandRegistry(
    //this.container.resolve(TYPES.KafkaProducer),
    //resolver.resolve(TYPES.AccountsRepo),
    //resolver.resolve(TYPES.UsersRepo),
    //resolver.resolve(TYPES.RolesRepo),
    //),
    //)

    const server = new ApolloServer({
      //schema: buildFederatedSchema(schemas),
      context: ({req, res}): Context => {
        return {
          res,
          user: parseUserFromRequest(req),
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
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`),
    )
  }
}

const server = new Server()
server.start()
