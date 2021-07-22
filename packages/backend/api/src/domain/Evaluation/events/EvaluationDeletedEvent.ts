import {IEvaluationDeletedEvent, IEvaluationDeletedEventData} from './IEvaluationDeletedEvent'
import {EventType} from '../../EventType'
import {Evaluation} from '..'

export class EvaluationDeletedEvent implements IEvaluationDeletedEvent {
  timestamp = new Date()
  event = EventType.EVALUATION_DELETED_EVENT
  data: IEvaluationDeletedEventData

  constructor(evaluation: Evaluation) {
    this.data = {
      id: evaluation.id,
    }
  }
}
