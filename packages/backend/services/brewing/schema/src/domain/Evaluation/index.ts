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

  public delete() {
    this.registerEvent(new EvaluationDeletedEvent(this))
  }

  public update(attrs: Partial<EvaluationAttributes>) {
    ;(Object.keys(attrs) as Array<keyof EvaluationAttributes>).forEach(key => {
      // @ts-ignore
      this.attrs[key] = attrs[key]

      this.markedFields.set(key, this.attrs[key].value)
    })

    this.registerEvent(new EvaluationUpdatedEvent(this))
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
