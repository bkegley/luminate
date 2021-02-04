import {IBrewingSessionRepository} from './IBrewingSessionRepository'
import {EntityId} from '@luminate/services-shared'
import {BrewingSession} from '../../domain/BrewingSession'
import {BrewingSessionDTO} from '../dtos'
import {BrewingSessionMapper} from '../mappers'
import {KafkaClient, Consumer} from 'kafka-node'
import {
  BrewingSessionCreatedEvent,
  BrewingSessionUpdatedEvent,
  BrewingSessionDeletedEvent,
} from '../../domain/BrewingSession/events'
import {EventType} from '../../domain/EventType'

export class InMemoryBrewingSessionRepository implements IBrewingSessionRepository {
  // TODO: Saving these as BrewingSessionDTO[] is a temp solution
  private brewingSessions: BrewingSessionDTO[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const brewingSessionsConsumer = new Consumer(client, [{topic: 'brewingSessions', offset: 0}], {
      fromOffset: true,
    })

    /**
     * This is a temporary solution that bypasses db persistence
     * and requires replaying all events on startup
     */
    brewingSessionsConsumer.on('message', async message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWER_CREATED_EVENT: {
          const eventData = data.data as BrewingSessionCreatedEvent['data']
          // @ts-ignore
          const brewingSession = BrewingSessionMapper.toDomain(eventData)
          await this.save(brewingSession)
          break
        }
        case EventType.BREWER_UPDATED_EVENT: {
          const eventData = data.data as BrewingSessionUpdatedEvent['data']
          const brewingSession = BrewingSessionMapper.toDomain(eventData)
          await this.save(brewingSession, brewingSession.getEntityId())
          break
        }
        case EventType.BREWER_DELETED_EVENT: {
          const eventData = data.data as BrewingSessionDeletedEvent['data']
          await this.delete(eventData.id)
          break
        }
      }
    })
  }

  public async getById(id: EntityId | string) {
    const brewingSessionId = id instanceof EntityId ? id.toString() : id
    const brewingSession = this.brewingSessions.find(brewingSession => brewingSession.id === brewingSessionId)
    if (!brewingSession) {
      return undefined
    }

    return BrewingSessionMapper.toDomain(brewingSession)
  }

  public async save(brewingSession: BrewingSession, id?: EntityId | string) {
    if (id) {
      // if id is present update existing
      const brewingSessionId = id instanceof EntityId ? id.toString() : id
      this.brewingSessions = this.brewingSessions.map(existingBrewingSession => {
        if (existingBrewingSession.id !== brewingSessionId) {
          return existingBrewingSession
        }
        // Not sure if it's better to create Aggregate from persistence
        // and then update that aggregate and convert back to persistence
        // or to merge 2 dtos
        const existingBrewingSessionAgg = BrewingSessionMapper.toDomain(existingBrewingSession)
        existingBrewingSessionAgg.update(brewingSession.attrs)
        return BrewingSessionMapper.toPersistence(existingBrewingSessionAgg)
      })
    } else {
      // if no id create new
      this.brewingSessions.push(BrewingSessionMapper.toPersistence(brewingSession))
    }
  }

  public async delete(id: EntityId | string) {
    const brewingSessionId = id instanceof EntityId ? id.toString() : id
    this.brewingSessions = this.brewingSessions.filter(brewingSession => brewingSession.id !== brewingSessionId)
    return
  }
}
