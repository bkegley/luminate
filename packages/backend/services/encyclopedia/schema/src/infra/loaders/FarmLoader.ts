import {Injectable, Scope} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import DataLoader from 'dataloader'
import {Model} from 'mongoose'
import {FarmAggregate} from '../../domain/Farm/Farm'
import {FarmMapper} from '../mappers'
import {FarmDocument} from '../models'

@Injectable({scope: Scope.REQUEST})
export class FarmLoader {
  constructor(@InjectModel('farm') private readonly farmModel: Model<FarmDocument>) {}

  private byFarmName = new DataLoader<string, FarmAggregate | null>(async names => {
    const farms = await this.farmModel.find({name: names})

    return names.map(name => farms.find(farm => farm.name === name || null)).map(farm => FarmMapper.toDomain(farm))
  })

  private byFarmId = new DataLoader<string, FarmAggregate | null>(async ids => {
    const farms = await this.farmModel.find({_id: ids})
    return ids
      .map(id => farms.find(farm => farm._id.toString() === id.toString()) || null)
      .map(farm => FarmMapper.toDomain(farm))
  })

  public async getById(id: string) {
    return this.byFarmId.load(id)
  }

  public async getByName(name: string) {
    return this.byFarmName.load(name)
  }
}
