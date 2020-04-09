import React from 'react'
import RegionUpdateForm from './UpdateForm'
import {useGetRegionQuery} from '../../graphql'

const RegionUpdatePage = ({match}) => {
  const {id} = match.params
  const {data, error, loading} = useGetRegionQuery({variables: {id}})
  if (!data || error || loading) return null
  return <RegionUpdateForm region={data.getRegion} />
}

export default RegionUpdatePage
