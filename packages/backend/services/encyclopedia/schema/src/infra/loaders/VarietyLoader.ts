import {Injectable, Scope} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import DataLoader from 'dataloader'
import {Model} from 'mongoose'
import {VarietyAggregate} from '../../domain/Variety/Variety'
import {VarietyMapper} from '../mappers'
import {VarietyDocument} from '../models'

@Injectable({scope: Scope.REQUEST})
export class VarietyLoader {
  constructor(@InjectModel('variety') private readonly varietyModel: Model<VarietyDocument>) {}

  private byVarietyName = new DataLoader<string, VarietyAggregate | null>(async names => {
    const varieties = await this.varietyModel.find({name: names})

    return names
      .map(name => varieties.find(variety => variety.name === name || null))
      .map(variety => VarietyMapper.toDomain(variety))
  })

  private byVarietyId = new DataLoader<string, VarietyAggregate | null>(async ids => {
    const varieties = await this.varietyModel.find({_id: ids})
    return ids
      .map(id => varieties.find(variety => variety._id.toString() === id.toString()) || null)
      .map(variety => (variety ? VarietyMapper.toDomain(variety) : null))
  })

  public async getById(id: string) {
    return this.byVarietyId.load(id)
  }

  public async getByName(name: string) {
    return this.byVarietyName.load(name)
  }
}
