import React from 'react'
import {Heading, Button, Card} from '@luminate/gatsby-theme-luminate/src'
import {useListCountriesTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Country} from '@luminate/gatsby-theme-luminate/src'

interface Props extends RouteComponentProps {}

const ListCountriesView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListCountriesTableQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <Heading>Country</Heading>
        </div>
        <div>
          <Button onClick={() => history.push(`${url}/create`)}>Create New</Button>
        </div>
      </div>
      <Card className="overflow-hidden">
        {data.listCountries.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`}>
                <CountryRow country={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

interface CountryRowProps {
  country: Country
  index: number
}
const CountryRow = ({country, index}: CountryRowProps) => {
  return (
    <div className={`flex items-center py-3 px-4 bg-${index % 2 === 0 ? 'transparent' : 'gray-100'}`}>
      <div className="w-1/2">{country.name}</div>
    </div>
  )
}

export default ListCountriesView
