import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {CoffeeSchema, CountrySchema, FarmSchema, RegionSchema, VarietySchema} from './models'
import {CoffeesRepo, CountriesRepo, FarmsRepo, RegionsRepo, VarietiesRepo} from './repos'
import {CoffeeLoader, CountryLoader, FarmLoader, RegionLoader, VarietyLoader} from './loaders'

const mongoUrl = process.env.DB_URL || `mongodb://localhost:27017/luminate-encyclopedia`

const repos = [CoffeesRepo, CountriesRepo, FarmsRepo, RegionsRepo, VarietiesRepo]

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
        name: 'region',
        schema: RegionSchema,
      },
      {
        name: 'variety',
        schema: VarietySchema,
      },
    ]),
  ],
  providers: [...repos, ...loaders],
  exports: [...repos, ...loaders],
})
export class InfraModule {}
