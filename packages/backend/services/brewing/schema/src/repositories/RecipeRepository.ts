import {IRecipeRepository} from './IRecipeRepository'
import {EntityId} from '@luminate/services-shared'
import {Recipe} from '../domain/Recipe'
import {RecipeName} from '../domain/Recipe/RecipeName'
import {RecipeDTO} from '../dtos'
import {RecipeMapper} from '../mappers'
import {KafkaClient, Consumer} from 'kafka-node'
import {RecipeCreatedEvent, RecipeUpdatedEvent, RecipeDeletedEvent} from '../domain/Recipe/events'
import {EventType} from '../domain/EventType'

export class InMemoryRecipeRepository implements IRecipeRepository {
  // TODO: Saving these as RecipeDTO[] is a temp solution
  private recipes: RecipeDTO[] = []

  constructor() {
    const client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const recipesConsumer = new Consumer(client, [{topic: 'recipes', offset: 0}], {
      fromOffset: true,
    })

    /**
     * This is a temporary solution that bypasses db persistence
     * and requires replaying all events on startup
     */
    recipesConsumer.on('message', async message => {
      const data = JSON.parse(message.value as string)

      switch (data.event) {
        case EventType.BREWER_CREATED_EVENT: {
          const eventData = data.data as RecipeCreatedEvent['data']
          // @ts-ignore
          const recipe = RecipeMapper.toDomain(eventData)
          await this.save(recipe)
          break
        }
        //case EventType.BREWER_UPDATED_EVENT: {
        //const eventData = data.data as RecipeUpdatedEvent['data']
        //const recipe = RecipeMapper.toDomain(eventData)
        //await this.save(recipe, recipe.getEntityId())
        //break
        //}
        //case EventType.BREWER_DELETED_EVENT: {
        //const eventData = data.data as RecipeDeletedEvent['data']
        //await this.delete(eventData.id)
        //break
        //}
      }
    })
  }

  public async getById(id: EntityId) {
    const recipe = this.recipes.find(recipe => recipe.id === id.toString())
    if (!recipe) {
      return undefined
    }

    return RecipeMapper.toDomain(recipe)
  }

  public async getByName(name: RecipeName | string) {
    const recipeName = name instanceof RecipeName ? name.value : name
    const recipe = this.recipes.find(recipe => {
      return recipe.name === recipeName
    })
    if (!recipe) {
      return undefined
    }

    return RecipeMapper.toDomain(recipe)
  }

  public async save(recipe: Recipe, id?: EntityId | string) {
    if (id) {
      // if id is present update existing
      const recipeId = id instanceof EntityId ? id.toString() : id
      this.recipes = this.recipes.map(existingRecipe => {
        if (existingRecipe.id !== recipeId) {
          return existingRecipe
        }
        // Not sure if it's better to create Aggregate from persistence
        // and then update that aggregate and convert back to persistence
        // or to merge 2 dtos
        const existingRecipeAgg = RecipeMapper.toDomain(existingRecipe)
        existingRecipeAgg.update(recipe.attrs)
        return RecipeMapper.toPersistence(existingRecipeAgg)
      })
    } else {
      // if no id create new
      this.recipes.push(RecipeMapper.toPersistence(recipe))
    }
  }

  public async delete(id: EntityId | string) {
    const recipeId = id instanceof EntityId ? id.toString() : id
    this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId)
    return
  }
}
