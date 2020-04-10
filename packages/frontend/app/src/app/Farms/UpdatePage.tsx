import React from 'react'
import FarmUpdateForm from './UpdateForm'
import {useGetFarmQuery} from '../../graphql'

const FarmUpdatePage = ({match}) => {
  const {id} = match.params
  const {data, error, loading} = useGetFarmQuery({variables: {id}})
  if (!data || error || loading) return null
  return <FarmUpdateForm farm={data.getFarm} />
}

export default FarmUpdatePage
