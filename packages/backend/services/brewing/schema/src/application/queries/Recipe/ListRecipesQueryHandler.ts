import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {InMemoryRecipeRepository} from '../../../infra/repositories'
import {ListRecipesQuery} from './ListRecipesQuery'

@QueryHandler(ListRecipesQuery)
export class ListRecipesQueryHandler implements IQueryHandler {
  constructor(private readonly recipesRepo: InMemoryRecipeRepository) {}

  async execute(_query: ListRecipesQuery) {
    const recipes = await this.recipesRepo.list()

    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: recipes.map(recipe => {
        return {
          cursor: 'fakecursor',
          node: recipe,
        }
      }),
    }
  }
}
