import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {RecipesRepo} from '../../../infra/repos'
import {GetRecipeQuery} from './GetRecipeQuery'

@QueryHandler(GetRecipeQuery)
export class GetRecipeQueryHandler implements IQueryHandler {
  constructor(private readonly recipeRepo: RecipesRepo) {}

  async execute(query: GetRecipeQuery) {
    return this.recipeRepo.getById(query.user, query.id)
  }
}
