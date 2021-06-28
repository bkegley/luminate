import {Module} from '@nestjs/common'
import {RepoModule} from '../repos/RepoModule'
import {CoffeeService, CountryService, TokenService} from '.'

const services = [CoffeeService, CountryService, TokenService]

@Module({
  imports: [RepoModule],
  providers: services,
  exports: services,
})
export class ServiceModule {}
