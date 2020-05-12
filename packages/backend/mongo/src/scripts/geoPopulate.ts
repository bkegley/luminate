import shp from 'shpjs'
import fs from 'fs'
import https from 'https'
import mkdirp from 'mkdirp'
import {CountryService} from '../services/CountryService'
import createMongoConnection from '../createMongoConnection'
import {RegionService} from '../services'

async function downloadZip(url: string, filePath: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    await https.get(url, res => {
      res.pipe(file)
      // @ts-ignore
      file.on('finish', () => {
        resolve(fs.readFileSync(filePath))
      })
    })
  })
}

async function geoPopulate() {
  await mkdirp('./src/scripts/files', err => {
    if (err) {
      throw new Error(err.message)
    }
  })

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

  const countries = countriesJson.features

  const countryData = countries.map(country => {
    // @ts-ignore
    const {NAME, POP_EST, POP_RANK, POP_YEAR, REGION_UN, SOVEREIGNT, SUBREGION, SUBUNIT} = country.properties
    return {
      name: NAME,
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

  const regions = regionsJson.features

  const regionData = regions.map(region => {
    // @ts-ignore
    const {admin, name} = region.properties
    return {
      name,
      country: admin,
    }
  })

  await createMongoConnection(process.env.MONGO_URL)
  const countryService = new CountryService()
  const regionService = new RegionService()

  await Promise.all([
    ...countryData.map(country => countryService.upsert(country)),
    ...regionData.map(region => regionService.upsert(region)),
  ])

  process.exit(0)
}

geoPopulate()
