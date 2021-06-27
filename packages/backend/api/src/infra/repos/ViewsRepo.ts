import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IViewsRepo} from './IViewsRepo'
import {ViewDocument} from '../models'
import {ViewMapper} from '../mappers/ViewMapper'
import {ViewAggregate} from '../../domain/View/View'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'

@Injectable()
export class ViewsRepo extends AuthenticatedRepo<ViewDocument> implements IViewsRepo {
  constructor(@InjectModel('view') protected model: Model<ViewDocument>) {
    super(model)
  }

  save(user: Token, view: ViewAggregate): Promise<void>
  save(view: ViewAggregate): Promise<void>
  public async save(userOrView: Token | ViewAggregate, view?: ViewAggregate) {
    if (view) {
      const {_id, ...viewObj} = ViewMapper.toPersistence(view)
      await this.updateOne(userOrView as Token, {_id}, viewObj)
    } else {
      const {_id, ...viewObj} = ViewMapper.toPersistence(userOrView as ViewAggregate)
      await this.updateOne({_id}, viewObj)
    }
  }
}
