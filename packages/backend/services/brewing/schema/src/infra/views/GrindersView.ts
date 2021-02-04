import {KafkaClient, Consumer} from 'kafka-node'
import {IGrindersView} from '.'
import {GrinderCreatedEvent, GrinderUpdatedEvent, GrinderDeletedEvent} from '../../domain/Grinder/events'
import {EventType} from '../../domain/EventType'
import {Grinder} from '../../types'

export class GrindersView implements IGrindersView {
  private grinders: Array<Grinder> = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const grindersConsumer = new Consumer(client, [{topic: 'grinders', offset: 0}], {
      fromOffset: true,
    })

    grindersConsumer.on('message', message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.GRINDER_CREATED_EVENT: {
          this.handleGrinderCreatedEvent(data)
          break
        }

        case EventType.GRINDER_UPDATED_EVENT: {
          this.handleGrinderUpdateEvent(data)
          break
        }

        case EventType.GRINDER_DELETED_EVENT: {
          this.handleGrinderDeletedEvent(data)
          break
        }
      }
    })
  }

  private handleGrinderCreatedEvent(data: GrinderCreatedEvent) {
    // @ts-ignore
    this.grinders.push(data.data)
  }

  private handleGrinderUpdateEvent(data: GrinderUpdatedEvent) {
    // @ts-ignore
    this.grinders = this.grinders.map(grinder => (grinder.id === data.data.id ? {...grinder, ...data.data} : grinder))
  }

  private handleGrinderDeletedEvent(data: GrinderDeletedEvent) {
    this.grinders = this.grinders.filter(grinder => grinder.id !== data.data.id)
  }

  public async listGrinders() {
    return {
      pageInfo: {
        hasNextPage: false,
        nextCursor: '',
      },
      edges: this.grinders.map(grinder => ({cursor: '', node: grinder})),
    }
  }

  public async getGrinderById(id: string) {
    return this.grinders.find(grinder => grinder.id === id)
  }
}
