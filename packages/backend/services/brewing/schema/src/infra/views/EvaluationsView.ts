import {Evaluation} from '../../types'
import {KafkaClient, Consumer} from 'kafka-node'
import {IEvent} from '@luminate/services-shared'
import {EventType} from '../../domain/EventType'
import {IEvaluationCreatedEvent, IEvaluationUpdatedEvent, IEvaluationDeletedEvent} from '../../domain/Evaluation/events'
import {IEvaluationsView} from './IEvaluationsView'

export class EvaluationsView implements IEvaluationsView {
  private evaluations: Evaluation[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const consumer = new Consumer(
      client,
      [
        {
          topic: 'evaluations',
          offset: 0,
        },
      ],
      {fromOffset: true},
    )
    consumer.on('message', event => {
      const data = JSON.parse(event.value as string) as IEvent<any, any>['data']
      switch (data.event) {
        case EventType.EVALUATION_CREATED_EVENT: {
          this.handleEvaluationCreatedEvent(data)
          break
        }
        case EventType.EVALUATION_UPDATED_EVENT: {
          this.handleEvaluationUpdatedEvent(data)
          break
        }
        case EventType.EVALUATION_DELETED_EVENT: {
          this.handleEvaluationDeletedEvent(data)
          break
        }
        default: {
          break
        }
      }
    })
  }

  private handleEvaluationCreatedEvent(data: IEvaluationCreatedEvent) {
    this.evaluations.push(data.data)
  }

  private handleEvaluationUpdatedEvent(data: IEvaluationUpdatedEvent) {
    this.evaluations = this.evaluations.map(evaluation => (evaluation.id === data.data.id ? data.data : evaluation))
  }

  private handleEvaluationDeletedEvent(data: IEvaluationDeletedEvent) {
    this.evaluations = this.evaluations.filter(evaluation => evaluation.id !== data.data.id)
  }

  // @ts-ignore
  public async listEvaluations() {
    return {
      pageInfo: {
        hasNextPage: false,
        nextCursor: '',
      },
      edges: this.evaluations.map(evaluation => ({cursor: '', node: evaluation})),
    }
  }

  public async getEvaluation(id: string) {
    return this.evaluations.find(evaluation => evaluation.id === id)
  }
}
