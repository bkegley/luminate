import {EvaluationAttributes, Evaluation} from '.'
import {DateEntity} from '../Date'
import {EventType} from '../EventType'
import {EntityId} from '../../shared'

describe('Evaluation', () => {
  it('can be created with defaults and registers a created event', () => {
    const date = DateEntity.create({value: '2020-10-29'})
    const input: EvaluationAttributes = {
      date,
    }

    const evaluation = Evaluation.create(input)
    const createdEvent = evaluation.events.find(event => event.event === EventType.EVALUATION_CREATED_EVENT)

    expect(createdEvent).toBeDefined()
    expect(createdEvent.data.date).toBe(date.value)
  })

  it('can update and register an updated event', () => {
    const initialDate = DateEntity.create({value: '2020-10-29'})
    const updatedDate = DateEntity.create({value: '2020-10-30'})

    const entityId = EntityId.create()
    const input: EvaluationAttributes = {
      date: initialDate,
    }

    const evaluation = Evaluation.create(input, entityId)

    expect(evaluation.date.value).toBe(initialDate.value)

    evaluation.update({date: updatedDate})

    expect(evaluation.date.value).toBe(updatedDate.value)

    const createdEvent = evaluation.events.find(event => event.event === EventType.EVALUATION_CREATED_EVENT)
    const updatedEvent = evaluation.events.find(event => event.event === EventType.EVALUATION_UPDATED_EVENT)

    expect(createdEvent).toBeUndefined()
    expect(updatedDate).toBeDefined()

    expect(updatedEvent.data.date).toBe(updatedDate.value)
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
