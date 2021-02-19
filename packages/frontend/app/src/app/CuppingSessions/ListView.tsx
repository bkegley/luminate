import React from 'react'
import {useListCuppingSessionsQuery, CuppingSession} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Card, Page} from '@luminate/components'

interface Props extends RouteComponentProps {}

const ListCuppingSessionsView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListCuppingSessionsQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Page title="Cupping Session" primaryAction={{text: 'Create New', onClick: () => history.push(`${url}/create`)}}>
      <Card>
        {data.listCuppingSessions.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`}>
                <CuppingSessionRow cuppingSession={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </Page>
  )
}

interface CuppingSessionRowProps {
  cuppingSession: CuppingSession
  index: number
}
const CuppingSessionRow = ({cuppingSession, index}: CuppingSessionRowProps) => {
  return (
    <div className={`flex items-center py-3 px-4 bg-${index % 2 === 0 ? 'transparent' : 'gray-100'}`}>
      <div className="w-1/4">{cuppingSession.description}</div>
      <div className="w-1/4">{cuppingSession.sessionCoffees?.length}</div>
    </div>
  )
}

export default ListCuppingSessionsView
