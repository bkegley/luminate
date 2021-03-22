import {SetMetadata} from '@nestjs/common'

export const Authenticated = () => SetMetadata('authenticated', true)
