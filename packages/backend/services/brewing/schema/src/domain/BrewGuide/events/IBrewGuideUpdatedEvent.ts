import {IEvent} from '../../IEvent'
import {InstructionStep} from '../BrewGuideInstructions'

export interface IBrewGuideUpdatedEventData {
  id: string
  name?: string
  recipeId?: string
  overview?: string
  instructions?: InstructionStep[]
}

export interface IBrewGuideUpdatedEvent extends IEvent<IBrewGuideUpdatedEventData> {}
