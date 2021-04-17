import React from 'react'
import {Card, Page, Grid} from '@luminate/components'
import {useGetViewQuery} from '../../graphql'
import {useRouteMatch} from 'react-router-dom'

interface Props {}

const ViewDetailView = ({}: Props) => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()
  const {data, error, loading} = useGetViewQuery({variables: {id}})

  if (error) {
    return <div>Error!</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.getView) {
    return null
  }

  return (
    <Page title={data.getView?.name}>
      <div className="flex mb-4">
        <Grid>
          <Grid.Left>
            <Card>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Information Section</p>
                <p>{data.getView?.description}</p>
              </div>
              <pre>{JSON.stringify(data.getView, null, 2)}</pre>
            </Card>
          </Grid.Left>
        </Grid>
      </div>
    </Page>
  )
}

export default ViewDetailView
