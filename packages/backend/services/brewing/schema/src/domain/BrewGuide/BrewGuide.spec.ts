import {BrewGuide} from '.'
import {BrewGuideName} from './BrewGuideName'
import {EventType} from '../EventType'
import {BrewGuideCreatedEvent} from './events/BrewGuideCreatedEvent'
import {BrewGuideUpdatedEvent} from './events/BrewGuideUpdatedEvent'
import {EntityId} from '@luminate/services-shared'
import {InstructionStep, BrewGuideInstructions} from './BrewGuideInstructions'

describe('BrewGuide', () => {
  it('can be created with default values and registers a created event', () => {
    const name = 'Test Brew Guide'
    const recipeId = '12345'

    const brewGuide = BrewGuide.create({
      name: BrewGuideName.create({value: name}),
      recipeId: EntityId.create(recipeId),
    })

    const createdEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_CREATED_EVENT) as
      | BrewGuideCreatedEvent
      | undefined

    const expected = {
      event: EventType.BREW_GUIDE_CREATED_EVENT,
      data: {
        name,
        recipeId,
      },
    }

    expect(createdEvent).toMatchObject(expected)
    // created event only has provided fields stored
    expect(createdEvent.data.overview).toBeUndefined()
  })

  it('updates and registers an updated event', () => {
    const name = 'Test Brew Guide'
    const brewGuide = BrewGuide.create(
      {name: BrewGuideName.create({value: name}), recipeId: EntityId.create()},
      EntityId.create(),
    )

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

    const expected = {
      event: EventType.BREW_GUIDE_UPDATED_EVENT,
      data: {
        name: updatedName,
      },
    }

    expect(updatedEvent).toMatchObject(expected)
    // updated event only has updated fields stored
    expect(updatedEvent.data.overview).toBeUndefined()
  })

  it('deletes and registers a deleted event', () => {
    const brewGuide = BrewGuide.create({
      name: BrewGuideName.create({value: 'Test Brew Guide'}),
      recipeId: EntityId.create(),
    })
    brewGuide.delete()

    const deletedEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
  })

  it('can be created with instructions', () => {
    const firstStepNote = 'This is the first step'
    const secondStepNote = 'This is the second step'
    const instructions: InstructionStep[] = [
      {type: 'time', note: firstStepNote},
      {type: 'water', note: secondStepNote},
    ]

    const brewGuide = BrewGuide.create({
      name: BrewGuideName.create({value: 'Test BrewGuide'}),
      recipeId: EntityId.create(),
      instructions: BrewGuideInstructions.create({value: instructions}),
    })

    expect(brewGuide.instructions.value).toBe(instructions)

    const createdEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_CREATED_EVENT)

    const expected = {
      event: EventType.BREW_GUIDE_CREATED_EVENT,
      data: {
        instructions,
      },
    }
    expect(createdEvent).toMatchObject(expected)
  })
})
