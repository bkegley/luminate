/** @jsx jsx */
import React from 'react'
import {jsx} from 'theme-ui'
import {useGetCountryQuery} from '../../graphql'
import {Button} from '@luminate/gatsby-theme-luminate/src'
import {RouteComponentProps} from 'react-router-dom'
import CountryUpdateForm from './UpdateForm'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {}

const CountryDetailView = ({match}: Props) => {
  const [showUpdateCountry, setShowUpdateCountry] = React.useState(false)
  const toggleUpdateForm = () => setShowUpdateCountry(old => !old)
  const {
    params: {id},
  } = match

  const {data, error, loading} = useGetCountryQuery({variables: {id}})

  if (error) {
    return <div>Error!</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.getCountry) {
    return null
  }

  return (
    <div>
      <h1>{data.getCountry?.name}</h1>
      <Button onClick={toggleUpdateForm} variant="secondary">
        Edit
      </Button>
      {showUpdateCountry ? <CountryUpdateForm country={data.getCountry} /> : null}
    </div>
  )
}

export default CountryDetailView
