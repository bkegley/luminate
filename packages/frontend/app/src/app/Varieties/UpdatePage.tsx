import React from 'react'
import VarietyUpdateForm from './UpdateForm'
import {useGetVarietyQuery} from '../../graphql'

const VarietyUpdatePage = ({match}) => {
  const {id} = match.params
  const {data, error, loading} = useGetVarietyQuery({variables: {id}})
  if (!data || error || loading) return null
  return <VarietyUpdateForm variety={data.getVariety} />
}

export default VarietyUpdatePage
