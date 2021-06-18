import {SessionCoffeeInput} from '../../../types'

export class UpdateCuppingSessionCoffeesCommand {
  constructor(public id: string, public sessionCoffees: SessionCoffeeInput[]) {}
}
