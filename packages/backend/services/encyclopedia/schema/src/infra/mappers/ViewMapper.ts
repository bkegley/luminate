import {ViewAggregate, ViewAggregateAttributes} from '../../domain/View/View'
import {EntityId} from '@luminate/services-shared'
import {IViewDTO} from '../dtos'

export class ViewMapper {
  public static toAttrs(obj: any) {
    const attrs: ViewAggregateAttributes = {
      name: obj.name,
      description: obj.description,
    }

    return attrs
  }
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = ViewMapper.toAttrs(obj)

    const view = ViewAggregate.create(attrs, id ? EntityId.create(id) : null)
    return view
  }

  public static toPersistence(view: ViewAggregate) {
    return {
      _id: view.getEntityId().toString(),
      name: view.name,
      description: view.description,
    }
  }

  public static toDTO(view: ViewAggregate): IViewDTO {
    const now = new Date()
    return {
      id: view.getEntityId().toString(),
      name: view.name,
      description: view.description,
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
