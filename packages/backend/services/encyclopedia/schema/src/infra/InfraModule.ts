import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {CoffeeSchema, CountrySchema, FarmSchema, RegionSchema, VarietySchema} from './models'
import {CoffeesRepo, CountriesRepo, FarmsRepo, RegionsRepo, VarietiesRepo} from './repos'

const mongoUrl = process.env.DB_URL || `mongodb://localhost:27017/luminate-encyclopedia`

const repos = [CoffeesRepo, CountriesRepo, FarmsRepo, RegionsRepo, VarietiesRepo]

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
  providers: [...repos],
  exports: [...repos],
})
export class InfraModule {}
