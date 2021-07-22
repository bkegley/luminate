import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {RecipesRepo} from '../../../infra/repos'
import {ListRecipesQuery} from './ListRecipesQuery'

@QueryHandler(ListRecipesQuery)
export class ListRecipesQueryHandler implements IQueryHandler {
  constructor(private readonly recipesRepo: RecipesRepo) {}

  async execute(query: ListRecipesQuery) {
    return this.recipesRepo.getConnectionResults(query.user)
  }
}
