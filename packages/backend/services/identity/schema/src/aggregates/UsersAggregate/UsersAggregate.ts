import {IUsersAggregate} from './IUsersAggregate'
import {KafkaClient, Consumer} from 'kafka-node'
import {UserDocument} from '../../models'
import {IMessage} from '../../commands/IMessage'
import {IListDocumentsArgs} from '@luminate/mongo-utils'

export class UsersAggregate implements IUsersAggregate {
  private client: KafkaClient

  private users: UserDocument[] = []

  constructor(client: KafkaClient) {
    this.client = client

    const usersConsumer = new Consumer(this.client, [{topic: 'users', offset: 0}], {
      fromOffset: true,
    })

    usersConsumer.on('message', message => {
      const data: IMessage<UserDocument> = JSON.parse(message.value as string)

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

  // @ts-ignore
  public async getConnectionResults(args: IListDocumentsArgs) {
    return {
      pageInfo: {
        hasNextPage: false,
        previousCursor: '',
        nextCursor: '',
      },
      edges: this.users.map(user => ({node: user, cursor: ''})),
    }
  }
}
