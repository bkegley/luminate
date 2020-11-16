import {IEvent} from '../../IEvent'
import {InstructionStep} from '../BrewGuideInstructions'

export interface IBrewGuideCreatedEventData {
  id: string
  name: string
  recipeId: string
  overview?: string
  instructions?: InstructionStep[]
}

export interface IBrewGuideCreatedEvent extends IEvent<IBrewGuideCreatedEventData> {}
