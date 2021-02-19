import React from 'react'
import {Page} from '@luminate/components'
import FarmUpdateForm from './UpdateForm'
import {useGetFarmQuery} from '../../graphql'
import {useRouteMatch} from 'react-router-dom'

const FarmUpdatePage = () => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()

  const {data, error, loading} = useGetFarmQuery({variables: {id}})
  if (!data || error || loading) return null
  return (
    <Page title={data.getFarm?.name}>
      <FarmUpdateForm farm={data.getFarm} />
    </Page>
  )
}

export default FarmUpdatePage
