import {ICommandHandler} from '../..'
import {DeleteBrewerCommand} from '.'
import {Brewer} from '../../../domain/Brewer'

export interface IDeleteBrewerCommandHandler extends ICommandHandler<DeleteBrewerCommand, Brewer> {}
