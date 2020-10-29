import {Recipe} from './index'
import {RecipeName} from './RecipeName'
import {EntityId} from '../../shared'
import {EventType} from '../EventType'
import {GrinderId} from '../Grinder/GrinderId'
import {BrewerId} from '../Brewer/BrewerId'
import {RecipeCreatedEvent, RecipeUpdatedEvent} from './events'
import {CoffeeWeight} from './CoffeeWeight'
import {Weight} from '../Weight'
import {WaterWeight} from './WaterWeight'

describe('Recipe Aggregate', () => {
  it('can be created with default values and registers a created event', () => {
    const name = RecipeName.create({value: 'Test Recipe'})
    const recipe = Recipe.create({
      name,
      grinderId: GrinderId.create(EntityId.create()),
      brewerId: BrewerId.create(EntityId.create()),
      coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
    })

    expect(recipe).toBeDefined()
    const createdEvent = recipe.events.find(event => event.event === EventType.RECIPE_CREATED_EVENT) as
      | RecipeCreatedEvent
      | undefined
    expect(createdEvent).toBeDefined()

    expect(createdEvent.data.name).toBeDefined()
    expect(createdEvent.data.note).toBeUndefined()
  })

  it('requires a grinderId to be provided', () => {
    expect(() => {
      // @ts-ignore
      Recipe.create({
        name: RecipeName.create({value: 'Test Recipe'}),
        brewerId: BrewerId.create(EntityId.create()),
      })
    }).toThrowError()
  })

  it('requires a brewerId to be provided', () => {
    expect(() => {
      // @ts-ignore
      Recipe.create({
        name: RecipeName.create({value: 'Test Recipe'}),
        grinderId: GrinderId.create(EntityId.create()),
      })
    }).toThrowError()
  })

  it('updates a Recipe and registers an updated event', () => {
    const originalName = 'Test Recipe'

    const name = RecipeName.create({value: originalName})
    const recipe = Recipe.create(
      {
        name,
        grinderId: GrinderId.create(EntityId.create()),
        brewerId: BrewerId.create(EntityId.create()),
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

    expect(updatedEvent).toBeDefined()

    // update event only has updated fields stored
    expect(updatedEvent.data.name).toBeDefined()
    expect(updatedEvent.data.brewerId).toBeUndefined()
  })

  it('deletes a Recipe and registers a deleted event', () => {
    const recipe = Recipe.create(
      {
        name: RecipeName.create({value: 'Test Recipe'}),
        grinderId: GrinderId.create(EntityId.create()),
        brewerId: BrewerId.create(EntityId.create()),
        coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
        waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      },
      EntityId.create(),
    )

    recipe.delete()
    expect(recipe.events.find(event => event.event === EventType.RECIPE_DELETED_EVENT))
  })
})
