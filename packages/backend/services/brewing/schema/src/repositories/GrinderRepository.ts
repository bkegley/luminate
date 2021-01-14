import {IGrinderRepository} from './IGrinderRepository'
import {EntityId} from '@luminate/services-shared'
import {Grinder} from '../domain/Grinder'
import {GrinderName} from '../domain/Grinder/GrinderName'
import {GrinderDTO} from '../dtos'
import {GrinderMapper} from '../mappers'
import {KafkaClient, Consumer} from 'kafka-node'
import {GrinderCreatedEvent, GrinderUpdatedEvent, GrinderDeletedEvent} from '../domain/Grinder/events'
import {EventType} from '../domain/EventType'

export class InMemoryGrinderRepository implements IGrinderRepository {
  // TODO: Saving these as GrinderDTO[] is a temp solution
  private grinders: GrinderDTO[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const grindersConsumer = new Consumer(client, [{topic: 'grinders', offset: 0}], {
      fromOffset: true,
    })

    /**
     * This is a temporary solution that bypasses db persistence
     * and requires replaying all events on startup
     */
    grindersConsumer.on('message', async message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWER_CREATED_EVENT: {
          const eventData = data.data as GrinderCreatedEvent['data']
          // @ts-ignore
          const grinder = GrinderMapper.toDomain(eventData)
          await this.save(grinder)
          break
        }
        case EventType.BREWER_UPDATED_EVENT: {
          const eventData = data.data as GrinderUpdatedEvent['data']
          // @ts-ignore
          const grinder = GrinderMapper.toDomain(eventData)
          await this.save(grinder, grinder.getEntityId())
          break
        }
        case EventType.BREWER_DELETED_EVENT: {
          const eventData = data.data as GrinderDeletedEvent['data']
          await this.delete(eventData.id)
          break
        }
      }
    })
  }

  public async getById(id: EntityId) {
    const grinder = this.grinders.find(grinder => grinder.id === id.toString())
    if (!grinder) {
      return undefined
    }

    return GrinderMapper.toDomain(grinder)
  }

  public async getByName(name: GrinderName | string) {
    const grinderName = name instanceof GrinderName ? name.value : name
    const grinder = this.grinders.find(grinder => {
      return grinder.name === grinderName
    })
    if (!grinder) {
      return undefined
    }

    return GrinderMapper.toDomain(grinder)
  }

  public async save(grinder: Grinder, id?: EntityId | string) {
    if (id) {
      // if id is present update existing
      const grinderId = id instanceof EntityId ? id.toString() : id
      this.grinders = this.grinders.map(existingGrinder => {
        if (existingGrinder.id !== grinderId) {
          return existingGrinder
        }
        // Not sure if it's better to create Aggregate from persistence
        // and then update that aggregate and convert back to persistence
        // or to merge 2 dtos
        const existingGrinderAgg = GrinderMapper.toDomain(existingGrinder)
        existingGrinderAgg.update(grinder.attrs)
        return GrinderMapper.toPersistence(existingGrinderAgg)
      })
    } else {
      // if no id create new
      this.grinders.push(GrinderMapper.toPersistence(grinder))
    }
  }

  public async delete(id: EntityId | string) {
    const grinderId = id instanceof EntityId ? id.toString() : id
    this.grinders = this.grinders.filter(grinder => grinder.id !== grinderId)
    return
  }
}
