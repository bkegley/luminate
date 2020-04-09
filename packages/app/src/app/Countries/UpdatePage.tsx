import React from 'react'
import CountryUpdateForm from './UpdateForm'
import {useGetCountryQuery} from '../../graphql'

const CountryUpdatePage = ({match}) => {
  const {id} = match.params
  const {data, error, loading} = useGetCountryQuery({variables: {id}})
  if (!data || error || loading) return null
  return <CountryUpdateForm country={data.getCountry} />
}

export default CountryUpdatePage
