import {ICommandHandler} from '@nestjs/cqrs'
import {CreateBrewerCommand} from '.'
import {Brewer} from '../../../../domain/Brewer'

export interface ICreateBrewerCommandHandler extends ICommandHandler<CreateBrewerCommand, Brewer> {}
