import {EvaluationAttributes, Evaluation} from '.'
import {DateEntity} from '../Date'
import {EventType} from '../EventType'
import {EntityId} from '@luminate/services-shared'
import {EvaluationCreatedEvent, EvaluationUpdatedEvent} from './events'

describe('Evaluation', () => {
  it('can be created with defaults and registers a created event', () => {
    const date = DateEntity.create({value: '2020-10-29'})
    const input: EvaluationAttributes = {
      date,
    }

    const evaluation = Evaluation.create(input)
    const createdEvent = evaluation.events.find(event => event.event === EventType.EVALUATION_CREATED_EVENT) as
      | EvaluationCreatedEvent
      | undefined

    const expected = {
      event: EventType.EVALUATION_CREATED_EVENT,
      data: {
        date: date.value,
      },
    }

    expect(createdEvent).toMatchObject(expected)
  })

  it('can update and register an updated event', () => {
    const initialDate = DateEntity.create({value: '2020-10-29'})
    const updatedDate = DateEntity.create({value: '2020-10-30'})

    const entityId = EntityId.create()
    const input: EvaluationAttributes = {
      date: initialDate,
    }

    const evaluation = Evaluation.create(input, entityId)

    evaluation.update({date: updatedDate})

    expect(evaluation.date.value).toBe(updatedDate.value)

    const createdEvent = evaluation.events.find(event => event.event === EventType.EVALUATION_CREATED_EVENT) as
      | EvaluationCreatedEvent
      | undefined

    expect(createdEvent).toBeUndefined()

    const updatedEvent = evaluation.events.find(event => event.event === EventType.EVALUATION_UPDATED_EVENT) as
      | EvaluationUpdatedEvent
      | undefined

    const expected = {
      event: EventType.EVALUATION_UPDATED_EVENT,
      data: {
        date: updatedDate.value,
      },
    }

    expect(updatedEvent).toMatchObject(expected)
  })

  it('can be deleted and register a deleted event', () => {
    const entityId = EntityId.create()
    const evaluation = Evaluation.create({}, entityId)
    evaluation.delete()

    const deletedEvent = evaluation.events.find(event => event.event === EventType.EVALUATION_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()

    expect(deletedEvent.data.id).toBe(entityId.toString())
  })
})
