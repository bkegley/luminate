import {IDomainEvent} from '../../DomainEvent'

export interface IEvaluationCreatedEventData {
  id: string
  date?: string
}

export interface IEvaluationCreatedEvent extends IDomainEvent<IEvaluationCreatedEventData> {}
