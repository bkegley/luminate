import React from 'react'
import {Page} from '@luminate/components'
import ViewUpdateForm from './UpdateForm'
import {useGetVarietyQuery} from '../../graphql'
import {useRouteMatch} from 'react-router-dom'

const ViewUpdatePage = () => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()

  const {data, error, loading} = useGetVarietyQuery({variables: {id}})

  if (!data || error || loading) return null

  return (
    <Page title={data.getVariety?.name}>
      <ViewUpdateForm variety={data.getVariety} />
    </Page>
  )
}

export default ViewUpdatePage
