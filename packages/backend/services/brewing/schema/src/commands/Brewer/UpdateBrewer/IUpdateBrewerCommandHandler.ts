import {ICommandHandler} from '../..'
import {UpdateBrewerCommand} from '.'
import {Brewer} from '../../../domain/Brewer'

export interface IUpdateBrewerCommandHandler extends ICommandHandler<UpdateBrewerCommand, Brewer> {}
