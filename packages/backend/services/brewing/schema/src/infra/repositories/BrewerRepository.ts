import {IBrewerRepository} from './IBrewerRepository'
import {EntityId} from '@luminate/services-shared'
import {Brewer} from '../../domain/Brewer'
import {BrewerName} from '../../domain/Brewer/BrewerName'
import {BrewerDTO} from '../dtos'
import {BrewerMapper} from '../mappers'
import {KafkaClient, Consumer} from 'kafka-node'
import {BrewerCreatedEvent, BrewerUpdatedEvent, BrewerDeletedEvent} from '../../domain/Brewer/events'
import {EventType} from '../../domain/EventType'

export class InMemoryBrewerRepository implements IBrewerRepository {
  // TODO: Saving these as BrewerDTO[] is a temp solution
  private brewers: BrewerDTO[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const brewersConsumer = new Consumer(client, [{topic: 'brewers', offset: 0}], {
      fromOffset: true,
    })

    /**
     * This is a temporary solution that bypasses db persistence
     * and requires replaying all events on startup
     */
    brewersConsumer.on('message', async message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWER_CREATED_EVENT: {
          const eventData = data.data as BrewerCreatedEvent['data']
          const brewer = BrewerMapper.toDomain(eventData)
          await this.save(brewer)
          break
        }
        case EventType.BREWER_UPDATED_EVENT: {
          const eventData = data.data as BrewerUpdatedEvent['data']
          const brewer = BrewerMapper.toDomain(eventData)
          await this.save(brewer, brewer.getEntityId())
          break
        }
        case EventType.BREWER_DELETED_EVENT: {
          const eventData = data.data as BrewerDeletedEvent['data']
          await this.delete(eventData.id)
          break
        }
      }
    })
  }

  public async list() {
    return this.brewers
  }

  public async getById(id: EntityId | string) {
    const brewerId = id instanceof EntityId ? id.toString() : id
    const brewer = this.brewers.find(brewer => brewer.id === brewerId)
    if (!brewer) {
      return undefined
    }

    return BrewerMapper.toDomain(brewer)
  }

  public async getByName(name: BrewerName | string) {
    const brewerName = name instanceof BrewerName ? name.value : name
    const brewer = this.brewers.find(brewer => {
      return brewer.name === brewerName
    })
    if (!brewer) {
      return undefined
    }

    return BrewerMapper.toDomain(brewer)
  }

  public async save(brewer: Brewer, id?: EntityId | string) {
    if (id) {
      // if id is present update existing
      const brewerId = id instanceof EntityId ? id.toString() : id
      this.brewers = this.brewers.map(existingBrewer => {
        if (existingBrewer.id !== brewerId) {
          return existingBrewer
        }
        // Not sure if it's better to create Aggregate from persistence
        // and then update that aggregate and convert back to persistence
        // or to merge 2 dtos
        const existingBrewerAgg = BrewerMapper.toDomain(existingBrewer)
        existingBrewerAgg.update(brewer.attrs)
        return BrewerMapper.toPersistence(existingBrewerAgg)
      })
    } else {
      // if no id create new
      this.brewers.push(BrewerMapper.toPersistence(brewer))
    }
  }

  public async delete(id: EntityId | string) {
    const brewerId = id instanceof EntityId ? id.toString() : id
    this.brewers = this.brewers.filter(brewer => brewer.id !== brewerId)
    return
  }
}
