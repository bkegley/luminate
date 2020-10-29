import {BrewGuide, BrewGuideAttributes} from '.'
import {BrewGuideName} from './BrewGuideName'
import {EventType} from '../EventType'
import {BrewGuideCreatedEvent} from './events/BrewGuideCreatedEvent'
import {BrewGuideUpdatedEvent} from './events/BrewGuideUpdatedEvent'
import {EntityId} from '../../shared'
import {RecipeId} from '../Recipe/RecipeId'
import {InstructionStep, BrewGuideInstructions} from './BrewGuideInstructions'
import {BrewGuideOverview} from './BrewGuideOverview'

describe('BrewGuide', () => {
  it('can be created with default values and registers a created event', () => {
    const brewGuideName = 'Test Brew Guide'
    const brewGuide = BrewGuide.create({
      name: BrewGuideName.create({value: brewGuideName}),
      recipeId: RecipeId.create(),
    })

    const brewGuideCreatedEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_CREATED_EVENT) as
      | BrewGuideCreatedEvent
      | undefined

    expect(brewGuideCreatedEvent).toBeDefined()
    expect(brewGuideCreatedEvent.data.name).toBe(brewGuideName)
  })

  it('updates and registers an updated event', () => {
    const brewGuideName = 'Test Brew Guide'
    const brewGuide = BrewGuide.create(
      {name: BrewGuideName.create({value: brewGuideName}), recipeId: RecipeId.create()},
      EntityId.create(),
    )

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

  it('deletes and registers a deleted event', () => {
    const brewGuide = BrewGuide.create({
      name: BrewGuideName.create({value: 'Test Brew Guide'}),
      recipeId: RecipeId.create(),
    })
    brewGuide.delete()

    const deletedEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
  })

  it('should mark all fields when created', () => {
    const input: Required<BrewGuideAttributes> = {
      name: BrewGuideName.create({value: 'Test BrewGuide'}),
      recipeId: RecipeId.create(EntityId.create()),
      overview: BrewGuideOverview.create({value: 'This is an overview'}),
      instructions: BrewGuideInstructions.create({value: [{type: 'time', note: 'Step 1'}]}),
    }

    const brewGuide = BrewGuide.create(input)
    ;(Object.keys(input) as Array<keyof typeof input>).forEach(key => {
      expect(brewGuide.markedFields.get(key)).toBeDefined()
    })
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
      recipeId: RecipeId.create(EntityId.create()),
      instructions: BrewGuideInstructions.create({value: instructions}),
    })

    expect(brewGuide.instructions.value).toBe(instructions)
    expect(brewGuide.markedFields.get('instructions')).toBe(instructions)

    const createdEvent = brewGuide.events.find(event => event.event === EventType.BREW_GUIDE_CREATED_EVENT)
    expect(createdEvent.data.instructions).toBe(instructions)
  })
})
