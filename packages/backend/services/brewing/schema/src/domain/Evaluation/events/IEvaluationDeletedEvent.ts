import {IEvent} from '../../IEvent'

export interface IEvaluationDeletedEventData {
  id: string
}

export interface IEvaluationDeletedEvent extends IEvent<IEvaluationDeletedEventData> {}
