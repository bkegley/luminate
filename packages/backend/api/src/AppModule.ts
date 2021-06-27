import {Module} from '@nestjs/common'
import {ApplicationModule} from './application/ApplicationModule'
import {InfraModule} from './infra/InfraModule'

@Module({
  imports: [InfraModule, ApplicationModule],
})
export class AppModule {}
