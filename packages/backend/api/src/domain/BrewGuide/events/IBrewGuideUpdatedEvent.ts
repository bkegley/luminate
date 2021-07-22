import {IDomainEvent} from '../../DomainEvent'
import {InstructionStep} from '../BrewGuideInstructions'

export interface IBrewGuideUpdatedEventData {
  id: string
  name?: string
  recipeId?: string
  overview?: string
  instructions?: InstructionStep[]
}

export interface IBrewGuideUpdatedEvent extends IDomainEvent<IBrewGuideUpdatedEventData> {}
