import {Injectable, Scope} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import DataLoader from 'dataloader'
import {Model} from 'mongoose'
import {ViewAggregate} from '../../domain/View/View'
import {ViewMapper} from '../mappers'
import {ViewDocument} from '../models'

@Injectable({scope: Scope.REQUEST})
export class ViewLoader {
  constructor(@InjectModel('view') private readonly viewModel: Model<ViewDocument>) {}

  private byViewId = new DataLoader<string, ViewAggregate | null>(async ids => {
    const views = await this.viewModel.find({_id: ids})
    return ids
      .map(id => views.find(view => view._id.toString() === id.toString()) || null)
      .map(view => (view ? ViewMapper.toDomain(view) : null))
  })

  public async getById(id: string) {
    return this.byViewId.load(id)
  }
}
