import React from 'react'
import {useGetCuppingSessionQuery} from '../../graphql'
import {StyledLink, Card, Heading} from '@luminate/gatsby-theme-luminate/src'
import {RouteComponentProps} from 'react-router-dom'
import UnlockedCuppingSessionList from './UnlockedCuppingSessionList'
import LockedCuppingSessionList from './LockedCuppingSessionList'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {}

const CuppingSessionDetailView = ({match}: Props) => {
  const {
    params: {id},
  } = match
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
    <div>
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <Heading>{data.getCuppingSession?.description}</Heading>
        </div>
        <div className="text-sm">
          <StyledLink to={`${match.url}/edit`}>Edit Info</StyledLink>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="flex flex-col w-8/12 mr-4">
          <Card className="overflow-hidden">
            <img src="https://picsum.photos/800/400" />
            <div className="p-6">
              <p className="uppercase tracking-wide text-xs text-gray-600">Information Section</p>
              <p>This is some information about the coffee</p>
            </div>
          </Card>
        </div>
        <div className="flex flex-col w-4/12">
          <Card className="p-4 mb-3 bg-gray-100">
            <div className="mb-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Internal Id</p>
              {data.getCuppingSession.internalId || '-'}
            </div>
            <div className="mb-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Number of Coffees</p>
              {data.getCuppingSession.sessionCoffees?.length || '-'}
            </div>
          </Card>
        </div>
      </div>
      <div>
        {data.getCuppingSession.locked ? (
          <LockedCuppingSessionList cuppingSessionId={data.getCuppingSession.id} />
        ) : (
          <UnlockedCuppingSessionList cuppingSession={data.getCuppingSession} />
        )}
      </div>
    </div>
  )
}

export default CuppingSessionDetailView
