import {ICuppingSessionRepository} from './ICuppingSessionRepository'
import {EntityId} from '@luminate/services-shared'
import {CuppingSessionAggregate} from '../../domain/CuppingSession'
import {CuppingSessionDTO} from '../dtos'
import {CuppingSessionMapper} from '../mappers'
import {KafkaClient, Consumer} from 'kafka-node'
//import {
//CuppingSessionCreatedEvent,
//CuppingSessionUpdatedEvent,
//CuppingSessionDeletedEvent,
//} from '../../domain/CuppingSession/events'
//import {EventType} from '../../domain/EventType'

export class InMemoryCuppingSessionRepository implements ICuppingSessionRepository {
  // TODO: Saving these as CuppingSessionDTO[] is a temp solution
  private cuppingSessions: CuppingSessionDTO[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const cuppingSessionsConsumer = new Consumer(client, [{topic: 'cuppingSessions', offset: 0}], {
      fromOffset: true,
    })

    /**
     * This is a temporary solution that bypasses db persistence
     * and requires replaying all events on startup
     */
    cuppingSessionsConsumer.on('message', async message => {
      const data = JSON.parse(message.value as string)

      switch (
        data.event
        //case EventType.BREWER_CREATED_EVENT: {
        //const eventData = data.data as CuppingSessionCreatedEvent['data']
        //const brewer = CuppingSessionMapper.toDomain(eventData)
        //await this.save(brewer)
        //break
        //}
        //case EventType.BREWER_UPDATED_EVENT: {
        //const eventData = data.data as CuppingSessionUpdatedEvent['data']
        //const brewer = CuppingSessionMapper.toDomain(eventData)
        //await this.save(brewer, brewer.getEntityId())
        //break
        //}
        //case EventType.BREWER_DELETED_EVENT: {
        //const eventData = data.data as CuppingSessionDeletedEvent['data']
        //await this.delete(eventData.id)
        //break
        //}
      ) {
      }
    })
  }

  public async list() {
    return this.cuppingSessions.map(cuppingSession => CuppingSessionMapper.toDomain(cuppingSession))
  }

  public async getById(id: EntityId | string) {
    const cuppingSessionId = id instanceof EntityId ? id.toString() : id
    const cuppingSession = this.cuppingSessions.find(cuppingSession => cuppingSession.id === cuppingSessionId)
    if (!cuppingSession) {
      return undefined
    }

    return CuppingSessionMapper.toDomain(cuppingSession)
  }

  public async getByInternalId(id: string) {
    const cuppingSession = this.cuppingSessions.find(cuppingSession => {
      return cuppingSession.internalId === id
    })
    if (!cuppingSession) {
      return undefined
    }

    return CuppingSessionMapper.toDomain(cuppingSession)
  }

  public async save(cuppingSession: CuppingSessionAggregate, id?: EntityId | string) {
    if (id) {
      // if id is present update existing
      const cuppingSessionId = id instanceof EntityId ? id.toString() : id
      this.cuppingSessions = this.cuppingSessions.map(existingCuppingSession => {
        if (existingCuppingSession.id !== cuppingSessionId) {
          return existingCuppingSession
        }
        const existingCuppingSessionAgg = CuppingSessionMapper.toDomain(existingCuppingSession)
        existingCuppingSessionAgg.update(cuppingSession.attrs)
        return CuppingSessionMapper.toPersistence(existingCuppingSessionAgg)
      })
    } else {
      // if no id create new
      this.cuppingSessions.push(CuppingSessionMapper.toPersistence(cuppingSession))
    }
  }

  public async delete(id: EntityId | string) {
    const cuppingSessionId = id instanceof EntityId ? id.toString() : id
    this.cuppingSessions = this.cuppingSessions.filter(cuppingSession => cuppingSession.id !== cuppingSessionId)
    return
  }
}
