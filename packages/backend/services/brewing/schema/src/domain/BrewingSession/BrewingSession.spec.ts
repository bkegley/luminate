import {BrewingSession} from '.'
import {BrewingSessionDescription} from './BrewingSessionDescription'
import {EventType} from '../EventType'
import {EntityId} from '../../shared'
import {BrewingSessionCreatedEvent, BrewingSessionUpdatedEvent} from './events'
import {InMemoryBrewGuideRepository, InMemoryRecipeRepository} from '../../repositories'
import {BrewGuide} from '../BrewGuide'
import {BrewGuideName} from '../BrewGuide/BrewGuideName'
import {buildCommandTestContainer} from '../../../__tests__/buildCommandTestContainer'
import {Container} from '../../utils'

class MockBrewGuideRepo extends InMemoryBrewGuideRepository {
  async getById(id: EntityId | string) {
    const entityId = id instanceof EntityId ? id : EntityId.create(id)
    return BrewGuide.create(
      {name: BrewGuideName.create({value: 'Mock Brew Guide'}), recipeId: EntityId.create()},
      entityId,
    )
  }
}

describe('BrewingSession', () => {
  let container: Container

  beforeEach(() => {
    container = buildCommandTestContainer()
    container.bind<IBrewerRepository>(TYPES.BrewerRepository, new MockBrewerRepository())
    container.bind<IGrinderRepository>(TYPES.GrinderRepository, new MockGrinderRepository())
  })

  afterEach(() => {
    container = null
  })

  it('should be created with default values and register a created event', () => {
    const description = 'This is a test'

    const brewingSession = BrewingSession.create({
      description: BrewingSessionDescription.create({value: description}),
      brewGuideId: EntityId.create('1234'),
    })

    const createdEvent = brewingSession.events.find(
      event => event.event === EventType.BREWING_SESSION_CREATED_EVENT,
    ) as BrewingSessionCreatedEvent | undefined

    const expected = {
      event: EventType.BREWING_SESSION_CREATED_EVENT,
      data: {
        description,
      },
    }

    expect(createdEvent).toMatchObject(expected)
    // created event should only have provided values
    expect(createdEvent.data.date).toBeUndefined()
  })

  it('should update and register an updated event', () => {
    const initialDescription = 'Init this'
    const updatedDescription = 'Updated description'
    const brewingSession = BrewingSession.create(
      {
        description: BrewingSessionDescription.create({value: initialDescription}),
        brewGuideId: EntityId.create('1234'),
      },
      EntityId.create(),
    )

    expect(brewingSession.description.value).toBe(initialDescription)

    brewingSession.update({description: BrewingSessionDescription.create({value: updatedDescription})})
    expect(brewingSession.description.value).toBe(updatedDescription)

    const createdEvent = brewingSession.events.find(
      event => event.event === EventType.BREWING_SESSION_CREATED_EVENT,
    ) as BrewingSessionCreatedEvent | undefined

    expect(createdEvent).toBeUndefined()

    const updatedEvent = brewingSession.events.find(
      event => event.event === EventType.BREWING_SESSION_UPDATED_EVENT,
    ) as BrewingSessionUpdatedEvent | undefined

    const expected = {
      event: EventType.BREWING_SESSION_UPDATED_EVENT,
      data: {
        description: updatedDescription,
      },
    }

    expect(updatedEvent).toMatchObject(expected)
    // updated event should only have provided values
    expect(updatedEvent.data.date).toBeUndefined()
  })

  it('should delete and register a deleted event', () => {
    const id = EntityId.create()
    const brewingSession = BrewingSession.create(
      {
        brewGuideId: EntityId.create('1234'),
      },
      id,
    )
    brewingSession.delete()

    const deletedEvent = brewingSession.events.find(event => event.event === EventType.BREWING_SESSION_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
    expect(deletedEvent.data.id).toBe(id.toString())
  })
})
