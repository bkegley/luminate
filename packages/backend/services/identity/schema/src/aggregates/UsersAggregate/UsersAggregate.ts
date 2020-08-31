import {IUsersAggregate} from './IUsersAggregate'
import {KafkaClient, Consumer} from 'kafka-node'
import {UserDocument} from '../../models'
import {IMessage} from '../../commands/IMessage'
import {IListDocumentsArgs} from '@luminate/mongo-utils'
import {User} from '../../types'

export class UsersAggregate implements IUsersAggregate {
  private client: KafkaClient

  private users: UserDocument[] = []

  constructor() {
    this.client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const usersConsumer = new Consumer(this.client, [{topic: 'users', offset: 0}], {
      fromOffset: true,
    })

    usersConsumer.on('message', message => {
      const data: IMessage<UserDocument> = JSON.parse(message.value as string)
      console.log({userAggMessage: message})

      switch (data.event) {
        case 'UserCreatedEvent': {
          this.handleUserCreatedEvent(data)
        }
      }
    })
  }

  private handleUserCreatedEvent(message: IMessage<UserDocument>) {
    const {_id, ...user} = message.data
    // @ts-ignore
    this.users.push({id: _id, ...user})
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    return {
      pageInfo: {
        hasNextPage: false,
        prevCursor: '',
        nextCursor: '',
      },
      // needs to convert accountId in user object to account object either here or in a loader
      edges: this.users.map(user => ({node: (user as unknown) as User, cursor: ''})),
    }
  }

  public async getByUsername(username: string) {
    return this.users.find(user => user.username === username)
  }

  public async listByAccount(accountId: string) {
    return this.users.filter(user => user.accounts.includes(accountId as any))
  }
}
