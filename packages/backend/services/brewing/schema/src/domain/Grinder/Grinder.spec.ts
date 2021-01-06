import {Grinder} from '.'
import {GrinderName} from './GrinderName'
import {EventType} from '../EventType'
import {GrinderCreatedEvent} from './events/GrinderCreatedEvent'
import {GrinderUpdatedEvent} from './events/GrinderUpdatedEvent'
import {EntityId} from '../../shared'
import {GrinderDescription} from './GrinderDescription'

describe('Grinder', () => {
  it('can be created with default values and registers a created event', () => {
    const name = 'Test Grinder'
    const grinder = Grinder.create({
      name: GrinderName.create({value: name}),
    })

    expect(grinder.name.value).toBe(name)

    const createdEvent = grinder.events.find(event => event.event === EventType.GRINDER_CREATED_EVENT) as
      | GrinderCreatedEvent
      | undefined

    const expected = {
      event: EventType.GRINDER_CREATED_EVENT,
      data: {
        name,
      },
    }

    expect(createdEvent).toMatchObject(expected)
    // created event only has provided fields stored
    expect(createdEvent.data.description).toBeUndefined()
  })

  it('updates and registers an updated event', () => {
    const name = 'Test Grinder'
    const grinder = Grinder.create(
      {name: GrinderName.create({value: name}), description: GrinderDescription.create({value: 'Test'})},
      EntityId.create(),
    )

    const updatedName = 'Updated Grinder'
    grinder.update({name: GrinderName.create({value: updatedName})})

    expect(grinder.name.value).toBe(updatedName)

    const createdEvent = grinder.events.find(event => event.event === EventType.GRINDER_CREATED_EVENT) as
      | GrinderCreatedEvent
      | undefined

    expect(createdEvent).toBeUndefined()

    const updatedEvent = grinder.events.find(event => event.event === EventType.GRINDER_UPDATED_EVENT) as
      | GrinderUpdatedEvent
      | undefined

    const expected = {
      event: EventType.GRINDER_UPDATED_EVENT,
      data: {
        name: updatedName,
      },
    }

    expect(updatedEvent).toMatchObject(expected)
    // updated event only has updated fields stored
    // If we decide to not "markFields" this won't be true
    //expect(updatedEvent.data.description).toBeUndefined()
  })

  it('deletes and registers a deleted event', () => {
    const grinder = Grinder.create({
      name: GrinderName.create({value: 'Test Brew Guide'}),
    })
    grinder.delete()

    const deletedEvent = grinder.events.find(event => event.event === EventType.GRINDER_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
  })
})
