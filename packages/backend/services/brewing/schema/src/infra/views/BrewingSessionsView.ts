import {KafkaClient, Consumer} from 'kafka-node'
import {IBrewingSessionsView} from '.'
import {
  BrewingSessionCreatedEvent,
  BrewingSessionUpdatedEvent,
  BrewingSessionDeletedEvent,
} from '../../domain/BrewingSession/events'
import {EventType} from '../../domain/EventType'

import {BrewingSession} from '../../types'

export class BrewingSessionsView implements IBrewingSessionsView {
  private brewingSessions: Array<BrewingSession> = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const brewingSessionsConsumer = new Consumer(client, [{topic: 'brewingSessions', offset: 0}], {
      fromOffset: true,
    })

    brewingSessionsConsumer.on('message', message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWING_SESSION_CREATED_EVENT: {
          this.handleBrewingSessionCreatedEvent(data)
          break
        }

        case EventType.BREWING_SESSION_UPDATED_EVENT: {
          this.handleBrewingSessionUpdateEvent(data)
          break
        }

        case EventType.BREWING_SESSION_DELETED_EVENT: {
          this.handleBrewingSessionDeletedEvent(data)
          break
        }
      }
    })
  }

  private handleBrewingSessionCreatedEvent(data: BrewingSessionCreatedEvent) {
    // @ts-ignore
    this.brewingSessions.push(data.data)
  }

  private handleBrewingSessionUpdateEvent(data: BrewingSessionUpdatedEvent) {
    this.brewingSessions = this.brewingSessions.map(brewingSession =>
      brewingSession.id === data.data.id ? {...brewingSession, ...data.data} : brewingSession,
    )
  }

  private handleBrewingSessionDeletedEvent(data: BrewingSessionDeletedEvent) {
    this.brewingSessions = this.brewingSessions.filter(brewingSession => brewingSession.id !== data.data.id)
  }
  public async listBrewingSessions() {
    return {
      pageInfo: {
        hasNextPage: false,
        nextCursor: '',
      },
      edges: this.brewingSessions.map(brewingSession => ({cursor: '', node: brewingSession})),
    }
  }

  public async getBrewingSessionById(id: string) {
    return this.brewingSessions.find(brewingSession => brewingSession.id === id)
  }
}
