import {KafkaClient, Consumer} from 'kafka-node'
import {IBrewGuidesView} from '.'
import {BrewGuideCreatedEvent, BrewGuideUpdatedEvent, BrewGuideDeletedEvent} from '../../domain/BrewGuide/events'
import {EventType} from '../../domain/EventType'

import {BrewGuide} from '../../types'

export class BrewGuidesView implements IBrewGuidesView {
  private brewGuides: Array<BrewGuide> = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const brewGuidesConsumer = new Consumer(client, [{topic: 'brewGuides', offset: 0}], {
      fromOffset: true,
    })

    brewGuidesConsumer.on('message', message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREW_GUIDE_CREATED_EVENT: {
          this.handleBrewGuideCreatedEvent(data)
          break
        }

        case EventType.BREW_GUIDE_UPDATED_EVENT: {
          this.handleBrewGuideUpdateEvent(data)
          break
        }

        case EventType.BREW_GUIDE_DELETED_EVENT: {
          this.handleBrewGuideDeletedEvent(data)
          break
        }
      }
    })
  }

  private handleBrewGuideCreatedEvent(data: BrewGuideCreatedEvent) {
    // @ts-ignore
    this.brewGuides.push(data.data)
  }

  private handleBrewGuideUpdateEvent(data: BrewGuideUpdatedEvent) {
    this.brewGuides = this.brewGuides.map(brewGuide =>
      brewGuide.id === data.data.id ? {...brewGuide, ...data.data} : brewGuide,
    )
  }

  private handleBrewGuideDeletedEvent(data: BrewGuideDeletedEvent) {
    this.brewGuides = this.brewGuides.filter(brewGuide => brewGuide.id !== data.data.id)
  }

  public async listBrewGuides() {
    return {
      pageInfo: {
        hasNextPage: false,
        nextCursor: '',
      },
      edges: this.brewGuides.map(brewGuide => ({cursor: '', node: brewGuide})),
    }
  }

  public async getBrewGuideById(id: string) {
    return this.brewGuides.find(brewGuide => brewGuide.id === id)
  }
}
