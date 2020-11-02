import {IBrewGuideRepository} from './IBrewGuideRepository'
import {EntityId} from '../shared'
import {BrewGuide} from '../domain/BrewGuide'
import {BrewGuideName} from '../domain/BrewGuide/BrewGuideName'
import {BrewGuideDTO} from '../dtos'
import {BrewGuideMapper} from '../mappers'
import {KafkaClient, Consumer} from 'kafka-node'
import {
  IBrewGuideUpdatedEventData,
  IBrewGuideCreatedEventData,
  IBrewGuideDeletedEventData,
} from '../domain/BrewGuide/events'
import {EventType} from '../domain/EventType'

export class InMemoryBrewGuideRepository implements IBrewGuideRepository {
  // TODO: Saving these as BrewGuideDTO[] is a temp solution
  private brewGuides: BrewGuideDTO[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const brewGuidesConsumer = new Consumer(client, [{topic: 'brewGuides', offset: 0}], {
      fromOffset: true,
    })

    /**
     * This is a temporary solution that bypasses db persistence
     * and requires replaying all events on startup
     */
    brewGuidesConsumer.on('message', async message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWER_CREATED_EVENT: {
          const eventData = data.data as IBrewGuideCreatedEventData
          // @ts-ignore
          const brewGuide = BrewGuideMapper.toDomain(eventData)
          await this.save(brewGuide)
          break
        }
        case EventType.BREWER_UPDATED_EVENT: {
          const eventData = data.data as IBrewGuideUpdatedEventData
          // @ts-ignore
          const brewGuide = BrewGuideMapper.toDomain(eventData)
          await this.save(brewGuide, brewGuide.getEntityId())
          break
        }
        case EventType.BREWER_DELETED_EVENT: {
          const eventData = data.data as IBrewGuideDeletedEventData
          await this.delete(eventData.id)
          break
        }
      }
    })
  }

  public async getById(id: EntityId) {
    const brewGuide = this.brewGuides.find(brewGuide => brewGuide.id === id.toString())
    if (!brewGuide) {
      return undefined
    }

    return BrewGuideMapper.toDomain(brewGuide)
  }

  public async getByName(name: BrewGuideName | string) {
    const brewGuideName = name instanceof BrewGuideName ? name.value : name
    const brewGuide = this.brewGuides.find(brewGuide => {
      return brewGuide.name === brewGuideName
    })
    if (!brewGuide) {
      return undefined
    }

    return BrewGuideMapper.toDomain(brewGuide)
  }

  public async save(brewGuide: BrewGuide, id?: EntityId | string) {
    if (id) {
      // if id is present update existing
      const brewGuideId = id instanceof EntityId ? id.toString() : id
      this.brewGuides = this.brewGuides.map(existingBrewGuide => {
        if (existingBrewGuide.id !== brewGuideId) {
          return existingBrewGuide
        }
        // Not sure if it's better to create Aggregate from persistence
        // and then update that aggregate and convert back to persistence
        // or to merge 2 dtos
        const existingBrewGuideAgg = BrewGuideMapper.toDomain(existingBrewGuide)
        existingBrewGuideAgg.update(brewGuide.attrs)
        return BrewGuideMapper.toPersistence(existingBrewGuideAgg)
      })
    } else {
      // if no id create new
      this.brewGuides.push(BrewGuideMapper.toPersistence(brewGuide))
    }
  }

  public async delete(id: EntityId | string) {
    const brewGuideId = id instanceof EntityId ? id.toString() : id
    this.brewGuides = this.brewGuides.filter(brewGuide => brewGuide.id !== brewGuideId)
    return
  }
}
