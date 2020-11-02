import {AggregateRoot, EntityId} from '../../shared'
import {DateEntity} from '../Date'
import {EvaluationUpdatedEvent, EvaluationCreatedEvent, EvaluationDeletedEvent} from './events'

export interface EvaluationAttributes {
  date?: DateEntity
}

export class Evaluation extends AggregateRoot<EvaluationAttributes> {
  public get id() {
    return this._id.toString()
  }

  public get date() {
    return this.attrs.date
  }

  public update(attrs: EvaluationAttributes) {
    if (attrs.date) {
      this.attrs.date = attrs.date
      this.markedFields.set('date', attrs.date.value)
    }
    this.registerEvent(new EvaluationUpdatedEvent(this))
  }

  public delete() {
    this.registerEvent(new EvaluationDeletedEvent(this))
  }

  public static create(attrs: EvaluationAttributes, id?: EntityId) {
    const evaluation = new Evaluation(attrs, id)
    const isNew = !!id === false

    if (isNew) {
      ;(Object.keys(attrs) as Array<keyof EvaluationAttributes>).map(key => {
        evaluation.markedFields.set(key, attrs[key].value)
      })
      evaluation.registerEvent(new EvaluationCreatedEvent(evaluation))
    }

    return evaluation
  }
}
