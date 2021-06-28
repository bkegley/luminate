import {Module} from '@nestjs/common'
import {RepoModule} from '../repos/RepoModule'
import {ModelModule} from '../models/ModelModule'
import {CoffeeLoader, CountryLoader, FarmLoader, RegionLoader, VarietyLoader, ViewLoader} from '.'

const loaders = [CoffeeLoader, CountryLoader, FarmLoader, RegionLoader, VarietyLoader, ViewLoader]

@Module({
  imports: [RepoModule, ModelModule],
  providers: loaders,
  exports: loaders,
})
export class LoaderModule {}
