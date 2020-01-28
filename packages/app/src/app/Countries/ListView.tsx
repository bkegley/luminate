import React from 'react'
import {useListCountriesQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps {}

const CountriesListView = ({match}: Props) => {
  const {url} = match
  const {data, error, loading} = useListCountriesQuery()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <div>
      {data.listCountries.edges.map(({node}) => {
        return (
          <div key={node?.id}>
            <Link to={`${url}/${node?.id}`}>
              <h1 key={node?.id}>{node?.name}</h1>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default CountriesListView
