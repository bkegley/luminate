import {IEvaluationRepository} from './IEvaluationRepository'
import {EntityId} from '../shared'
import {Evaluation} from '../domain/Evaluation'
import {EvaluationDTO} from '../dtos'
import {EvaluationMapper} from '../mappers'
import {KafkaClient, Consumer} from 'kafka-node'
import {EvaluationCreatedEvent, EvaluationUpdatedEvent, EvaluationDeletedEvent} from '../domain/Evaluation/events'
import {EventType} from '../domain/EventType'

export class InMemoryEvaluationRepository implements IEvaluationRepository {
  // TODO: Saving these as EvaluationDTO[] is a temp solution
  private evaluations: EvaluationDTO[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const evaluationsConsumer = new Consumer(client, [{topic: 'evaluations', offset: 0}], {
      fromOffset: true,
    })

    /**
     * This is a temporary solution that bypasses db persistence
     * and requires replaying all events on startup
     */
    evaluationsConsumer.on('message', async message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWER_CREATED_EVENT: {
          const eventData = data.data as EvaluationCreatedEvent['data']
          // @ts-ignore
          const evaluation = EvaluationMapper.toDomain(eventData)
          await this.save(evaluation)
          break
        }
        case EventType.BREWER_UPDATED_EVENT: {
          const eventData = data.data as EvaluationUpdatedEvent['data']
          const evaluation = EvaluationMapper.toDomain(eventData)
          await this.save(evaluation, evaluation.getEntityId())
          break
        }
        case EventType.BREWER_DELETED_EVENT: {
          const eventData = data.data as EvaluationDeletedEvent['data']
          await this.delete(eventData.id)
          break
        }
      }
    })
  }

  public async getById(id: EntityId | string) {
    const evaluationId = id instanceof EntityId ? id.toString() : id
    const evaluation = this.evaluations.find(evaluation => evaluation.id === evaluationId)
    if (!evaluation) {
      return undefined
    }

    return EvaluationMapper.toDomain(evaluation)
  }

  public async save(evaluation: Evaluation, id?: EntityId | string) {
    if (id) {
      // if id is present update existing
      const evaluationId = id instanceof EntityId ? id.toString() : id
      this.evaluations = this.evaluations.map(existingEvaluation => {
        if (existingEvaluation.id !== evaluationId) {
          return existingEvaluation
        }
        // Not sure if it's better to create Aggregate from persistence
        // and then update that aggregate and convert back to persistence
        // or to merge 2 dtos
        const existingEvaluationAgg = EvaluationMapper.toDomain(existingEvaluation)
        existingEvaluationAgg.update(evaluation.attrs)
        return EvaluationMapper.toPersistence(existingEvaluationAgg)
      })
    } else {
      // if no id create new
      this.evaluations.push(EvaluationMapper.toPersistence(evaluation))
    }
  }

  public async delete(id: EntityId | string) {
    const evaluationId = id instanceof EntityId ? id.toString() : id
    this.evaluations = this.evaluations.filter(evaluation => evaluation.id !== evaluationId)
    return
  }
}
