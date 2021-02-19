import React from 'react'
import BrewerUpdateForm from './UpdateForm'
import {useGetBrewerQuery} from '../../graphql'
import {useRouteMatch} from 'react-router-dom'
import {Page} from '@luminate/components'

const BrewerUpdatePage = () => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()
  const {data, error, loading} = useGetBrewerQuery({variables: {id}})

  if (!data || error || loading) return null
  return (
    <Page title={data.getBrewer.name}>
      <BrewerUpdateForm brewer={data.getBrewer} />
    </Page>
  )
}

export default BrewerUpdatePage
