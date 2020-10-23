import {BrewGuide} from '.'
import {BrewGuideName} from './BrewGuideName'
import {EventType} from '../EventType'
import {BrewGuideCreatedEvent} from './events/BrewGuideCreatedEvent'
import {BrewGuideUpdatedEvent} from './events/BrewGuideUpdatedEvent'
import {EntityId} from '../../shared'

describe('BrewGuide', () => {
  it('can be created with default values and registers a created event', () => {
    const brewGuideName = 'Test Brew Guide'
    const brewGuide = BrewGuide.create({name: BrewGuideName.create({value: brewGuideName})})

    const brewGuideCreatedEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_CREATED_EVENT) as
      | BrewGuideCreatedEvent
      | undefined

    expect(brewGuideCreatedEvent).toBeDefined()
    expect(brewGuideCreatedEvent.data.name).toBe(brewGuideName)
  })

  it('updates and registers an updated event', () => {
    const brewGuideName = 'Test Brew Guide'
    const brewGuide = BrewGuide.create({name: BrewGuideName.create({value: brewGuideName})}, EntityId.create())

    expect(brewGuide.name.value).toBe(brewGuideName)

    const updatedName = 'Updated Brew Guide'
    brewGuide.update({name: BrewGuideName.create({value: updatedName})})

    expect(brewGuide.name.value).toBe(updatedName)

    const createdEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_CREATED_EVENT) as
      | BrewGuideCreatedEvent
      | undefined

    expect(createdEvent).toBeUndefined()

    const updatedEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_UPDATED_EVENT) as
      | BrewGuideUpdatedEvent
      | undefined
    expect(updatedEvent).toBeDefined()
  })

  it.skip('deletes and registers a deleted event', () => {
    const brewGuide = BrewGuide.create({name: BrewGuideName.create({value: 'Test Brew Guide'})})
    brewGuide.delete()

    const deletedEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
  })
})
