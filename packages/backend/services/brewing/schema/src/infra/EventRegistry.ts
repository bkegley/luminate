import {AggregateRoot} from '@luminate/services-shared'
import {IEventRegistry} from '.'
import {EventType} from '../domain/EventType'
import {Producer} from 'kafka-node'
import {IBrewerCreatedEvent, IBrewerDeletedEvent, IBrewerUpdatedEvent} from '../domain/Brewer/events'
import {IBrewGuideCreatedEvent, IBrewGuideUpdatedEvent, IBrewGuideDeletedEvent} from '../domain/BrewGuide/events'
import {
  IBrewingSessionCreatedEvent,
  IBrewingSessionUpdatedEvent,
  IBrewingSessionDeletedEvent,
} from '../domain/BrewingSession/events'
import {IEvaluationCreatedEvent, IEvaluationUpdatedEvent, IEvaluationDeletedEvent} from '../domain/Evaluation/events'
import {IGrinderCreatedEvent, IGrinderUpdatedEvent, IGrinderDeletedEvent} from '../domain/Grinder/events'
import {IRecipeCreatedEvent, IRecipeDeletedEvent, IRecipeUpdatedEvent} from '../domain/Recipe/events'
import {IDomainEvent} from '../domain/DomainEvent'

export class EventRegistry implements IEventRegistry {
  private markedAggregates = new Map<string, AggregateRoot<any>>()
  private eventHandlers = new Map<EventType, (event: IDomainEvent<any>) => void>()

  constructor(private producer: Producer) {
    // Brewer Events
    this.eventHandlers.set(EventType.BREWER_CREATED_EVENT, (event: IBrewerCreatedEvent) => {
      this.publishEvent(event, 'brewers')
    })
    this.eventHandlers.set(EventType.BREWER_UPDATED_EVENT, (event: IBrewerUpdatedEvent) => {
      this.publishEvent(event, 'brewers')
    })
    this.eventHandlers.set(EventType.BREWER_DELETED_EVENT, (event: IBrewerDeletedEvent) => {
      this.publishEvent(event, 'brewers')
    })

    // BrewGuide Events
    this.eventHandlers.set(EventType.BREW_GUIDE_CREATED_EVENT, (event: IBrewGuideCreatedEvent) => {
      this.publishEvent(event, 'brewGuides')
    })
    this.eventHandlers.set(EventType.BREW_GUIDE_UPDATED_EVENT, (event: IBrewGuideUpdatedEvent) => {
      this.publishEvent(event, 'brewGuides')
    })
    this.eventHandlers.set(EventType.BREW_GUIDE_DELETED_EVENT, (event: IBrewGuideDeletedEvent) => {
      this.publishEvent(event, 'brewGuides')
    })

    // BrewingSession Events
    this.eventHandlers.set(EventType.BREWING_SESSION_CREATED_EVENT, (event: IBrewingSessionCreatedEvent) => {
      this.publishEvent(event, 'brewingSessions')
    })
    this.eventHandlers.set(EventType.BREWING_SESSION_UPDATED_EVENT, (event: IBrewingSessionUpdatedEvent) => {
      this.publishEvent(event, 'brewingSessions')
    })
    this.eventHandlers.set(EventType.BREWING_SESSION_DELETED_EVENT, (event: IBrewingSessionDeletedEvent) => {
      this.publishEvent(event, 'brewingSessions')
    })

    // Evaluation Events
    this.eventHandlers.set(EventType.EVALUATION_CREATED_EVENT, (event: IEvaluationCreatedEvent) => {
      this.publishEvent(event, 'evaluations')
    })
    this.eventHandlers.set(EventType.EVALUATION_UPDATED_EVENT, (event: IEvaluationUpdatedEvent) => {
      this.publishEvent(event, 'evaluations')
    })
    this.eventHandlers.set(EventType.EVALUATION_DELETED_EVENT, (event: IEvaluationDeletedEvent) => {
      this.publishEvent(event, 'evaluations')
    })

    // Grinder Events
    this.eventHandlers.set(EventType.GRINDER_CREATED_EVENT, (event: IGrinderCreatedEvent) => {
      this.publishEvent(event, 'grinders')
    })
    this.eventHandlers.set(EventType.GRINDER_UPDATED_EVENT, (event: IGrinderUpdatedEvent) => {
      this.publishEvent(event, 'grinders')
    })
    this.eventHandlers.set(EventType.GRINDER_DELETED_EVENT, (event: IGrinderDeletedEvent) => {
      this.publishEvent(event, 'grinders')
    })

    // Recipe Events
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

  private publishEvent<T>(event: IDomainEvent<T>, topic: string) {
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
