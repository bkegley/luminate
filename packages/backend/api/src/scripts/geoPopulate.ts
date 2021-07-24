import shp from 'shpjs'
import fs from 'fs'
import https from 'https'
import mkdirp from 'mkdirp'
import {createMongoConnection} from '@luminate/mongo-utils'
import {CountryModel, RegionModel} from '../infra/models'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/luminate'

function downloadZip(url: string, filePath: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    https.get(url, res => {
      res.pipe(file)
      // @ts-ignore
      file.on('finish', () => {
        resolve(fs.readFileSync(filePath))
      })
    })
  })
}

async function geoPopulate() {
  mkdirp.sync('./src/scripts/files')

  const countriesFilePath = './src/scripts/files/countries.zip'
  const countriesUrl = 'https://naciscdn.org/naturalearth/10m/cultural/ne_10m_admin_0_countries.zip'

  const regionsFilePath = './src/scripts/files/regions.zip'
  const regionsUrl = 'https://naciscdn.org/naturalearth/10m/cultural/ne_10m_admin_1_states_provinces.zip'

  const [countriesZipFile, regionsZipFile] = await Promise.all([
    downloadZip(countriesUrl, countriesFilePath),
    downloadZip(regionsUrl, regionsFilePath),
  ])
  const [countriesJson, regionsJson] = await Promise.all<
    shp.FeatureCollectionWithFilename,
    shp.FeatureCollectionWithFilename
  >([
    (shp.parseZip(countriesZipFile) as unknown) as shp.FeatureCollectionWithFilename,
    (shp.parseZip(regionsZipFile) as unknown) as shp.FeatureCollectionWithFilename,
  ])

  await createMongoConnection(MONGO_URL)

  // Create countries
  const countries = countriesJson.features

  const countryData = countries.map(country => {
    const {
      // @ts-ignore
      NAME,
      // @ts-ignore
      NAME_EN,
      // @ts-ignore
      SOV_A3,
      // @ts-ignore
      POP_EST,
      // @ts-ignore
      POP_RANK,
      // @ts-ignore
      POP_YEAR,
      // @ts-ignore
      REGION_UN,
      // @ts-ignore
      SOVEREIGNT,
      // @ts-ignore
      SUBREGION,
      // @ts-ignore
      SUBUNIT,
    } = country.properties
    return {
      name: NAME,
      nameEn: NAME_EN,
      sovereignId: SOV_A3,
      population: {
        estimate: POP_EST,
        rank: POP_RANK,
        year: POP_YEAR,
      },
      geography: {
        region: REGION_UN,
        subRegion: SUBREGION,
        subUnit: SUBUNIT,
        sovereignNation: SOVEREIGNT,
      },
    }
  })

  const dbCountries = await Promise.all([
    ...countryData.map(country =>
      CountryModel.findOneAndUpdate({name: country.name}, country, {upsert: true, new: true}),
    ),
  ])

  // Create regions
  const regions = regionsJson.features

  const regionData = regions.map(region => {
    // @ts-ignore
    const {admin: countryName, name, sov_a3: sovereignId} = region.properties

    const foundCountry = dbCountries.find(
      country =>
        country?.sovereignId === sovereignId ||
        country?.name === countryName ||
        country?.nameEn === countryName ||
        country?.geography.subUnit === countryName ||
        country?.geography.sovereignNation === countryName,
    )

    if (!foundCountry) {
      console.log(`There was an error finding the country - ${countryName} for region - ${name}`)
    }

    return {
      name,
      country: foundCountry?._id || null,
    }
  }, [])

  const dbRegions = await Promise.all([
    ...regionData
      .filter(Boolean)
      .map(region => RegionModel.findOneAndUpdate({name: region.name}, region, {upsert: true, new: true})),
  ])

  process.exit(0)
}

geoPopulate()
