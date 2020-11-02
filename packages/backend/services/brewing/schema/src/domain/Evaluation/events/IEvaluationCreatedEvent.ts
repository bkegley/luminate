import {IEvent} from '../../IEvent'

export interface IEvaluationCreatedEventData {
  id: string
  date?: string
}

export interface IEvaluationCreatedEvent extends IEvent<IEvaluationCreatedEventData> {}
