import {KafkaClient, Consumer} from 'kafka-node'
import {IBrewersView} from '.'
import {EventType, BrewerCreatedEvent, BrewerUpdatedEvent, BrewerDeletedEvent} from '../events'
import {Brewer} from '../types'

export class BrewersView implements IBrewersView {
  private brewers: Array<Brewer> = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const brewersConsumer = new Consumer(client, [{topic: 'brewers', offset: 0}], {
      fromOffset: true,
    })

    brewersConsumer.on('message', message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWER_CREATED_EVENT: {
          this.handleBrewerCreatedEvent(data)
          break
        }

        case EventType.BREWER_UPDATED_EVENT: {
          this.handleBrewerUpdateEvent(data)
          break
        }

        case EventType.BREWER_DELETED_EVENT: {
          this.handleBrewerDeletedEvent(data)
          break
        }
      }
    })
  }

  private handleBrewerCreatedEvent(data: BrewerCreatedEvent) {
    this.brewers.push(data.data)
  }

  private handleBrewerUpdateEvent(data: BrewerUpdatedEvent) {
    this.brewers = this.brewers.map(brewer => (brewer.id === data.data.id ? {...brewer, ...data.data} : brewer))
  }

  private handleBrewerDeletedEvent(data: BrewerDeletedEvent) {
    this.brewers = this.brewers.filter(brewer => brewer.id !== data.data.id)
  }

  public async listBrewers() {
    return {
      pageInfo: {
        hasNextPage: false,
        nextCursor: '',
      },
      edges: this.brewers.map(brewer => ({cursor: '', node: brewer})),
    }
  }

  public async getBrewerById(id: string) {
    return this.brewers.find(brewer => brewer.id === id)
  }
}
