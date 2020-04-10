import React from 'react'
import CoffeeUpdateForm from './UpdateForm'
import {useGetCoffeeQuery} from '../../graphql'

const CoffeeUpdatePage = ({match}) => {
  const {id} = match.params
  const {data, error, loading} = useGetCoffeeQuery({variables: {id}})
  if (!data || error || loading) return null
  return <CoffeeUpdateForm coffee={data.getCoffee} />
}

export default CoffeeUpdatePage
