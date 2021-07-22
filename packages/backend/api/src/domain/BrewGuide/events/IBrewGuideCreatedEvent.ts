import {IDomainEvent} from '../../DomainEvent'
import {InstructionStep} from '../BrewGuideInstructions'

export interface IBrewGuideCreatedEventData {
  id: string
  name: string
  recipeId: string
  overview?: string
  instructions?: InstructionStep[]
}

export interface IBrewGuideCreatedEvent extends IDomainEvent<IBrewGuideCreatedEventData> {}
