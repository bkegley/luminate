import React from 'react'
import {useGetCuppingSessionQuery} from '../../graphql'
import {Page, Grid, Card} from '@luminate/components'
import {RouteComponentProps, useHistory} from 'react-router-dom'
import UnlockedCuppingSessionList from './UnlockedCuppingSessionList'
import LockedCuppingSessionList from './LockedCuppingSessionList'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {}

const CuppingSessionDetailView = ({match}: Props) => {
  const {
    url,
    params: {id},
  } = match
  const history = useHistory()
  const {data, error, loading} = useGetCuppingSessionQuery({variables: {id}})

  if (error) {
    return <div>Error!</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.getCuppingSession) {
    return null
  }

  return (
    <Page
      title={data.getCuppingSession?.description}
      primaryAction={{text: 'Edit', onClick: () => history.push(`${url}/edit`)}}
    >
      <Grid>
        <Grid.Left>
          <Card>
            <img src="https://picsum.photos/800/400" />
            <div className="p-6">
              <p className="uppercase tracking-wide text-xs text-gray-600">Information Section</p>
              <p>This is some information about the coffee</p>
            </div>
          </Card>
        </Grid.Left>
        <Grid.Right>
          <Card>
            <div className="mb-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Internal Id</p>
              {data.getCuppingSession.internalId || '-'}
            </div>
            <div className="mb-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Number of Coffees</p>
              {data.getCuppingSession.sessionCoffees?.length || '-'}
            </div>
          </Card>
        </Grid.Right>
      </Grid>
      <div>
        {data.getCuppingSession.locked ? (
          <LockedCuppingSessionList cuppingSessionId={data.getCuppingSession.id} />
        ) : (
          <UnlockedCuppingSessionList cuppingSession={data.getCuppingSession} />
        )}
      </div>
    </Page>
  )
}

export default CuppingSessionDetailView
