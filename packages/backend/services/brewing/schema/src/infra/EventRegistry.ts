import {AggregateRoot} from '../shared'
import {IEventRegistry} from '.'
import {EventType} from '../domain/EventType'
import {IEvent} from '../domain/IEvent'
import {BrewerCreatedEvent, BrewerUpdatedEvent, BrewerDeletedEvent} from '../domain/Brewer/events'
import {IGrinderCreatedEvent, IGrinderUpdatedEvent, GrinderDeletedEvent} from '../domain/Grinder/events'
import {IRecipeCreatedEvent, IRecipeDeletedEvent, IRecipeUpdatedEvent} from '../domain/Recipe/events'
import {Producer} from 'kafka-node'
import {IBrewGuideCreatedEvent, IBrewGuideUpdatedEvent, IBrewGuideDeletedEvent} from '../domain/BrewGuide/events'

export class EventRegistry implements IEventRegistry {
  private markedAggregates = new Map<string, AggregateRoot<any>>()
  private producer: Producer

  private eventHandlers = new Map<EventType, (event: IEvent<any>) => void>()

  constructor(producer: Producer) {
    this.producer = producer

    this.eventHandlers.set(EventType.BREWER_CREATED_EVENT, (event: IEvent<BrewerCreatedEvent>) => {
      this.publishEvent(event, 'brewers')
    })

    this.eventHandlers.set(EventType.BREWER_UPDATED_EVENT, (event: IEvent<BrewerUpdatedEvent>) => {
      this.publishEvent(event, 'brewers')
    })

    this.eventHandlers.set(EventType.BREWER_DELETED_EVENT, (event: IEvent<BrewerDeletedEvent>) => {
      this.publishEvent(event, 'brewers')
    })

    this.eventHandlers.set(EventType.BREW_GUIDE_CREATED_EVENT, (event: IBrewGuideCreatedEvent) => {
      this.publishEvent(event, 'brewGuides')
    })

    this.eventHandlers.set(EventType.BREW_GUIDE_UPDATED_EVENT, (event: IBrewGuideUpdatedEvent) => {
      this.publishEvent(event, 'brewGuides')
    })

    this.eventHandlers.set(EventType.BREW_GUIDE_DELETED_EVENT, (event: IBrewGuideDeletedEvent) => {
      this.publishEvent(event, 'brewGuides')
    })

    this.eventHandlers.set(EventType.GRINDER_CREATED_EVENT, (event: IGrinderCreatedEvent) => {
      this.publishEvent(event, 'grinders')
    })

    this.eventHandlers.set(EventType.GRINDER_UPDATED_EVENT, (event: IGrinderUpdatedEvent) => {
      this.publishEvent(event, 'grinders')
    })

    this.eventHandlers.set(EventType.GRINDER_DELETED_EVENT, (event: IEvent<GrinderDeletedEvent>) => {
      this.publishEvent(event, 'grinders')
    })

    this.eventHandlers.set(EventType.RECIPE_CREATED_EVENT, (event: IRecipeCreatedEvent) => {
      this.publishEvent(event, 'recipes')
    })

    this.eventHandlers.set(EventType.RECIPE_UPDATED_EVENT, (event: IRecipeUpdatedEvent) => {
      this.publishEvent(event, 'recipes')
    })

    this.eventHandlers.set(EventType.RECIPE_DELETED_EVENT, (event: IRecipeDeletedEvent) => {
      this.publishEvent(event, 'recipes')
    })
  }

  private publishEvent<T>(event: IEvent<T>, topic: string) {
    return new Promise((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(event), topic}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public publishEvents() {
    this.markedAggregates.forEach(agg => {
      agg.events.forEach(event => {
        const handler = this.eventHandlers.get(event.event)
        handler(event)
      })
    })
  }

  public markAggregateForPublish<T>(agg: AggregateRoot<T>) {
    this.markedAggregates.set(agg.getEntityId().toString(), agg)
  }
}
