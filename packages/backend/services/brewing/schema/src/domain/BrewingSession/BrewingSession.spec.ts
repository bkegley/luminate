import {BrewingSession} from '.'
import {DateEntity} from '../Date'
import {BrewingSessionDescription} from './BrewingSessionDescription'
import {EventType} from '../EventType'
import {EntityId} from '../../shared'

describe('BrewingSession', () => {
  it('should be created with default values and register a created event', () => {
    const description = 'This is a test'

    const brewingSession = BrewingSession.create({
      description: BrewingSessionDescription.create({value: description}),
    })

    const createdEvent = brewingSession.events.find(event => event.event === EventType.BREWING_SESSION_CREATED_EVENT)
    expect(createdEvent).toBeDefined()

    expect(createdEvent.data.date).toBeUndefined()
    expect(createdEvent.data.description).toBe(description)
  })

  it('should update and register an updated event', () => {
    const initialDescription = 'Init this'
    const updatedDescription = 'Updated description'
    const brewingSession = BrewingSession.create(
      {
        description: BrewingSessionDescription.create({value: initialDescription}),
      },
      EntityId.create(),
    )

    expect(brewingSession.description.value).toBe(initialDescription)

    brewingSession.update({description: BrewingSessionDescription.create({value: updatedDescription})})
    expect(brewingSession.description.value).toBe(updatedDescription)

    const updatedEvent = brewingSession.events.find(event => event.event === EventType.BREWING_SESSION_UPDATED_EVENT)
    const createdEvent = brewingSession.events.find(event => event.event === EventType.BREWING_SESSION_CREATED_EVENT)
    expect(updatedEvent).toBeDefined()
    expect(createdEvent).toBeUndefined()
    expect(updatedEvent.data.description).toBe(updatedDescription)
  })

  it('should delete and register a deleted event', () => {
    const id = EntityId.create()
    const brewingSession = BrewingSession.create({}, id)
    brewingSession.delete()

    const deletedEvent = brewingSession.events.find(event => event.event === EventType.BREWING_SESSION_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
    expect(deletedEvent.data.id).toBe(id.toString())
  })
})
