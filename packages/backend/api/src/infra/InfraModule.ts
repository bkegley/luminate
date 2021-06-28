import {Module} from '@nestjs/common'
import {RepoModule} from './repos/RepoModule'
import {ServiceModule} from './services/ServiceModule'
import {LoaderModule} from './loaders/LoaderModule'

@Module({
  imports: [LoaderModule, RepoModule, ServiceModule],
  exports: [LoaderModule, RepoModule, ServiceModule],
})
export class InfraModule {}
