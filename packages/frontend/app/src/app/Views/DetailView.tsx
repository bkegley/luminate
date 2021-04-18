import React from 'react'
import {Card, Page, Grid} from '@luminate/components'
import {useGetViewQuery} from '../../graphql'
import {useHistory, useRouteMatch} from 'react-router-dom'
import {ViewDisplay} from '../../components/ViewCreator/ViewDisplay'

interface Props {}

const ViewDetailView = ({}: Props) => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()
  const {data, error, loading} = useGetViewQuery({variables: {id}})
  const history = useHistory()

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
    <Page
      title={data.getView?.name}
      primaryAction={{
        text: 'Update',
        variant: 'outline',
        onClick: () => history.push(`/views/${id}/edit`),
        as: 'a',
      }}
    >
      <div className="flex mb-4">
        <Grid>
          <Grid.Left>
            <Card>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Information Section</p>
                <p>{data.getView?.description}</p>
              </div>
              <ViewDisplay id={id} />
            </Card>
          </Grid.Left>
          <Grid.Right>
            <div className="bg-gray-600">hey there</div>
          </Grid.Right>
        </Grid>
      </div>
    </Page>
  )
}

export default ViewDetailView
