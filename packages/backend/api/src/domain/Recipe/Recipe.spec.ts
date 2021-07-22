import {Recipe} from './index'
import {RecipeName} from './RecipeName'
import {EntityId} from '@luminate/ddd'
import {EventType} from '../EventType'
import {RecipeCreatedEvent, RecipeUpdatedEvent} from './events'
import {CoffeeWeight} from './CoffeeWeight'
import {Weight} from '../Weight'
import {WaterWeight} from './WaterWeight'

describe('Recipe Aggregate', () => {
  it('can be created with default values and registers a created event', () => {
    const name = 'Test Recipe'
    const coffeeWeight = CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})})
    const waterWeight = WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})})

    const recipe = Recipe.create({
      name: RecipeName.create({value: name}),
      grinderId: EntityId.create(),
      brewerId: EntityId.create(),
      coffeeWeight,
      waterWeight,
    })

    expect(recipe).toBeDefined()

    const createdEvent = recipe.events.find(event => event.event === EventType.RECIPE_CREATED_EVENT) as
      | RecipeCreatedEvent
      | undefined

    const expected = {
      event: EventType.RECIPE_CREATED_EVENT,
      data: {
        name,
        coffeeWeight: coffeeWeight.value,
        waterWeight: waterWeight.value,
      },
    }

    expect(createdEvent).toMatchObject(expected)
    // created event should only have provided fields
    expect(createdEvent.data.note).toBeUndefined()
  })

  it('updates a Recipe and registers an updated event', () => {
    const originalName = 'Test Recipe'

    const name = RecipeName.create({value: originalName})
    const recipe = Recipe.create(
      {
        name,
        grinderId: EntityId.create(),
        brewerId: EntityId.create(),
        coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
        waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      },
      EntityId.create(),
    )

    const updatedName = 'Updated Name'

    recipe.update({
      name: RecipeName.create({value: updatedName}),
    })

    expect(recipe.name.value).toBe(updatedName)

    const updatedEvent = recipe.events.find(event => event.event === EventType.RECIPE_UPDATED_EVENT) as
      | RecipeUpdatedEvent
      | undefined

    const expected = {
      event: EventType.RECIPE_UPDATED_EVENT,
      data: {
        name: updatedName,
      },
    }

    expect(updatedEvent).toMatchObject(expected)
    // update event only has updated fields stored
    expect(updatedEvent.data.brewerId).toBeUndefined()
  })

  it('deletes a Recipe and registers a deleted event', () => {
    const recipe = Recipe.create(
      {
        name: RecipeName.create({value: 'Test Recipe'}),
        grinderId: EntityId.create(),
        brewerId: EntityId.create(),
        coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
        waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      },
      EntityId.create(),
    )

    recipe.delete()
    const deletedEvent = recipe.events.find(event => event.event === EventType.RECIPE_DELETED_EVENT)
    expect(deletedEvent).toBeDefined()
  })
})
