import {IEvent} from '../../IEvent'

export interface IEvaluationUpdatedEventData {
  id: string
  date?: string
}

export interface IEvaluationUpdatedEvent extends IEvent<IEvaluationUpdatedEventData> {}
