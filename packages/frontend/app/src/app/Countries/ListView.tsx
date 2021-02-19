import React from 'react'
import {Card, Page} from '@luminate/components'
import {useListCountriesTableQuery, Country} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps {}

const ListCountriesView = ({match}: Props) => {
  const {url} = match
  const {data, error, loading} = useListCountriesTableQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Page title="Country">
      <Card>
        <div className="p-6">
          {data.listCountries.edges.map(({node}, index) => {
            return (
              <div key={node?.id}>
                <Link to={`${url}/${node?.id}`}>
                  <CountryRow country={node} index={index} />
                </Link>
              </div>
            )
          })}
        </div>
      </Card>
    </Page>
  )
}

interface CountryRowProps {
  country: Country
  index: number
}
const CountryRow = ({country, index}: CountryRowProps) => {
  return (
    <div
      className={`flex items-center py-3 px-4 ${index % 2 === 0 ? 'bg-transparent' : 'bg-gray-100 dark:bg-gray-800'}`}
    >
      <div className="w-1/2">{country.name}</div>
    </div>
  )
}

export default ListCountriesView
