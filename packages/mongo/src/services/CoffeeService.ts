import {CoffeeModel, CoffeeDocument} from '../models/Coffee'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class CoffeeService extends AuthenticatedService<CoffeeDocument> {
  constructor() {
    super(CoffeeModel)
  }

  public findCoffees(conditions: any) {
    return this.model.find(conditions)
  }
}
