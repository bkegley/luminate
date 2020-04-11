import React from 'react'
import {useListCuppingSessionsQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {CuppingSession, Tooltip, Heading, Button, Card} from '@luminate/gatsby-theme-luminate/src'
import {formatDistanceToNow, format} from 'date-fns'

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
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <Heading>Cupping Session</Heading>
        </div>
        <div>
          <Button as="a" onClick={() => history.push(`${url}/create`)}>
            Create New
          </Button>
        </div>
      </div>
      <Card className="overflow-hidden">
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
    </div>
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
      <div className="w-1/4">
        <Tooltip text={format(parseInt(cuppingSession.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(cuppingSession.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
      <div className="w-1/4">
        <Tooltip text={format(parseInt(cuppingSession.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(cuppingSession.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
    </div>
  )
}

export default ListCuppingSessionsView
