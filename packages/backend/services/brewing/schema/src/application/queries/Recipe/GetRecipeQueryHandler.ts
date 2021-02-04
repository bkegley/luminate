import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {InMemoryRecipeRepository} from '../../../infra/repositories'
import {GetRecipeQuery} from './GetRecipeQuery'

@QueryHandler(GetRecipeQuery)
export class GetRecipeQueryHandler implements IQueryHandler {
  constructor(private readonly recipeRepo: InMemoryRecipeRepository) {}

  async execute(query: GetRecipeQuery) {
    return this.recipeRepo.getById(query.id)
  }
}
