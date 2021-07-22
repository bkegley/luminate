import {IEvaluationUpdatedEvent} from './IEvaluationUpdatedEvent'
import {EventType} from '../../EventType'
import {IEvaluationCreatedEventData} from './IEvaluationCreatedEvent'
import {Evaluation} from '..'

export class EvaluationUpdatedEvent implements IEvaluationUpdatedEvent {
  timestamp = new Date()
  event = EventType.EVALUATION_UPDATED_EVENT
  data: IEvaluationCreatedEventData

  constructor(evaluation: Evaluation) {
    const updatedFields = Object.fromEntries([...evaluation.markedFields])
    this.data = {
      id: evaluation.id,
      ...updatedFields,
    }
  }
}
