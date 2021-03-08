import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetFarmQuery} from '.'
import {FarmDocument} from '../../../infra/models'
import {FarmsRepo} from '../../../infra/repos'

@QueryHandler(GetFarmQuery)
export class GetFarmQueryHandler implements IQueryHandler<GetFarmQuery, FarmDocument> {
  constructor(private readonly farmsRepo: FarmsRepo) {}

  async execute(query: GetFarmQuery) {
    return this.farmsRepo.getById(query.id)
  }
}
