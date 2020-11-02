import {IEvaluationCreatedEvent, IEvaluationCreatedEventData} from './IEvaluationCreatedEvent'
import {EventType} from '../../EventType'
import {Evaluation} from '..'

export class EvaluationCreatedEvent implements IEvaluationCreatedEvent {
  timestamp = new Date()
  event = EventType.EVALUATION_CREATED_EVENT
  data: IEvaluationCreatedEventData

  constructor(evaluation: Evaluation) {
    const createdFields = Object.fromEntries([...evaluation.markedFields])
    this.data = {
      id: evaluation.id,
      ...createdFields,
    }
  }
}
