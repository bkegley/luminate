/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useListCountriesQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Drawer} from '@luminate/gatsby-theme-luminate/src'
import CreateCountryForm from './CreateForm'

interface Props extends RouteComponentProps {}

const CountriesListView = ({match}: Props) => {
  const [showCreateForm, setShowCreateForm] = React.useState(false)
  const toggleShowCreateForm = () => setShowCreateForm(old => !old)
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
      <button onClick={toggleShowCreateForm}>Create New</button>
      {data.listCountries.edges.map(({node}) => {
        return (
          <div key={node?.id}>
            <Link to={`${url}/${node?.id}`}>
              <h1 key={node?.id}>{node?.name}</h1>
            </Link>
          </div>
        )
      })}
      <Drawer from="right" onClickOutside={toggleShowCreateForm} open={showCreateForm}>
        <CreateCountryForm />
      </Drawer>
    </div>
  )
}

export default CountriesListView
