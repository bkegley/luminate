import {IDomainEvent} from '../../DomainEvent'

export interface IEvaluationUpdatedEventData {
  id: string
  date?: string
}

export interface IEvaluationUpdatedEvent extends IDomainEvent<IEvaluationUpdatedEventData> {}
