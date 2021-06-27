import {ICommandHandler} from '@nestjs/cqrs'
import {SwitchAccountCommand} from '.'

export interface ISwitchAccountCommandHandler extends ICommandHandler<SwitchAccountCommand, string | null> {}
