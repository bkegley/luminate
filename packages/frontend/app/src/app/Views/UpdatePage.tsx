import React from 'react'
import {Page} from '@luminate/components'
import ViewUpdateForm from './UpdateForm'
import {useGetViewQuery} from '../../graphql'
import {useRouteMatch} from 'react-router-dom'

const ViewUpdatePage = () => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()

  const {data, error, loading} = useGetViewQuery({variables: {id}})

  if (!data || error || loading) return null

  return (
    <Page title={data.getView?.name}>
      <ViewUpdateForm view={data.getView} />
    </Page>
  )
}

export default ViewUpdatePage
