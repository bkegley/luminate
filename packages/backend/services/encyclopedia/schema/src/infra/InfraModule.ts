import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {CoffeeSchema, CountrySchema, FarmSchema, PostSchema, RegionSchema, VarietySchema} from './models'
import {CoffeesRepo, CountriesRepo, FarmsRepo, PostsRepo, RegionsRepo, VarietiesRepo} from './repos'
import {CoffeeLoader, CountryLoader, FarmLoader, RegionLoader, VarietyLoader} from './loaders'
import {CoffeeService, CountryService} from './services'

const mongoUrl = process.env.DB_URL || `mongodb://localhost:27017/luminate-encyclopedia`

const repos = [CoffeesRepo, CountriesRepo, FarmsRepo, PostsRepo, RegionsRepo, VarietiesRepo]

const services = [CoffeeService, CountryService]

const loaders = [CoffeeLoader, CountryLoader, FarmLoader, RegionLoader, VarietyLoader]

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, {useFindAndModify: false}),
    MongooseModule.forFeature([
      {
        name: 'coffee',
        schema: CoffeeSchema,
      },
      {
        name: 'country',
        schema: CountrySchema,
      },
      {
        name: 'farm',
        schema: FarmSchema,
      },
      {
        name: 'post',
        schema: PostSchema,
      },
      {
        name: 'region',
        schema: RegionSchema,
      },
      {
        name: 'variety',
        schema: VarietySchema,
      },
    ]),
  ],
  providers: [...repos, ...services, ...loaders],
  exports: [...repos, ...services, ...loaders],
})
export class InfraModule {}
