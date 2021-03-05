import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetFarmQuery} from '.'
import {FarmAggregate} from '../../../domain/Farm/Farm'
import {FarmsRepo} from '../../../infra/repos'

@QueryHandler(GetFarmQuery)
export class GetFarmQueryHandler implements IQueryHandler<GetFarmQuery, FarmAggregate> {
  constructor(private readonly farmsRepo: FarmsRepo) {}

  async execute(query: GetFarmQuery) {
    return this.farmsRepo.getById(query.id)
  }
}
