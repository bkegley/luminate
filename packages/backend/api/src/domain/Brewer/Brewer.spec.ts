import {Brewer} from '.'
import {BrewerName} from './BrewerName'
import {EventType} from '../EventType'
import {BrewerCreatedEvent} from './events/BrewerCreatedEvent'
import {BrewerUpdatedEvent} from './events/BrewerUpdatedEvent'
import {EntityId} from '@luminate/ddd'

describe('Brewer', () => {
  it('can be created with default values and registers a created event', () => {
    const name = 'Test Brewer'
    const brewer = Brewer.create({
      name: BrewerName.create({value: name}),
    })

    expect(brewer.name.value).toBe(name)

    const createdEvent = brewer.events.find(event => event.event === EventType.BREWER_CREATED_EVENT) as
      | BrewerCreatedEvent
      | undefined

    const expected = {
      event: EventType.BREWER_CREATED_EVENT,
      data: {
        name,
      },
    }

    expect(createdEvent).toMatchObject(expected)
    // created event only has provided fields stored
    expect(createdEvent.data.description).toBeUndefined()
  })

  it('updates and registers an updated event', () => {
    const name = 'Test Brewer'
    const brewer = Brewer.create({name: BrewerName.create({value: name})}, EntityId.create())

    const updatedName = 'Updated Brewer'
    brewer.update({name: BrewerName.create({value: updatedName})})

    expect(brewer.name.value).toBe(updatedName)

    const createdEvent = brewer.events.find(event => event.event === EventType.BREWER_CREATED_EVENT) as
      | BrewerCreatedEvent
      | undefined

    expect(createdEvent).toBeUndefined()

    const updatedEvent = brewer.events.find(event => event.event === EventType.BREWER_UPDATED_EVENT) as
      | BrewerUpdatedEvent
      | undefined

    const expected = {
      event: EventType.BREWER_UPDATED_EVENT,
      data: {
        name: updatedName,
      },
    }

    expect(updatedEvent).toMatchObject(expected)
    // updated event only has updated fields stored
    expect(updatedEvent.data.description).toBeUndefined()
  })

  it('deletes and registers a deleted event', () => {
    const brewer = Brewer.create({
      name: BrewerName.create({value: 'Test Brew Guide'}),
    })
    brewer.delete()

    const deletedEvent = brewer.events.find(event => event.event === EventType.BREWER_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
  })
})
