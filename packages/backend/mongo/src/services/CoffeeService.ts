import {CoffeeModel, CoffeeDocument} from '../models/Coffee'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byCoffeeId?: DataLoader<string, CoffeeDocument | null>
  listByVarietyId?: DataLoader<string, CoffeeDocument[] | null>
}

export class CoffeeService extends AuthenticatedService<CoffeeDocument> {
  constructor() {
    super(CoffeeModel)

    this.loaders.byCoffeeId = new DataLoader<string, CoffeeDocument | null>(async ids => {
      const coffees = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => coffees.find(coffee => coffee._id.toString() === id.toString()) || null)
    })

    this.loaders.listByVarietyId = new DataLoader<string, CoffeeDocument[] | null>(async ids => {
      const coffees = await this.model.find({varieties: ids, ...this.getReadConditionsForUser()})
      return ids.map(
        id =>
          coffees.filter(coffee => coffee.varieties?.map(varietyId => varietyId.toString() === id.toString())) || null,
      )
    })
  }

  private loaders: Loaders = {}

  public findCoffees(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }

  public async getById(id: string) {
    return this.loaders.byCoffeeId?.load(id) || null
  }

  public listByVarietyId(varietyId: string) {
    return this.loaders.listByVarietyId?.load(varietyId) || null
  }
}
