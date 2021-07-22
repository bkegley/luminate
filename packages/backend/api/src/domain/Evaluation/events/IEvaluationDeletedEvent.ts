import {IDomainEvent} from '../../DomainEvent'

export interface IEvaluationDeletedEventData {
  id: string
}

export interface IEvaluationDeletedEvent extends IDomainEvent<IEvaluationDeletedEventData> {}
