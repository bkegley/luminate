import React from 'react'
import {Heading, Button, Card, Variety, Tooltip} from '@luminate/gatsby-theme-luminate/src'
import {useListVarietiesTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {formatDistanceToNow, format} from 'date-fns'

interface Props extends RouteComponentProps {}

const ListVarietiesView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListVarietiesTableQuery()

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
          <Heading>Variety</Heading>
        </div>
        <div>
          <Button onClick={() => history.push(`${url}/create`)}>Create New</Button>
        </div>
      </div>
      <Card>
        {data.listVarieties.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`}>
                <VarietyRow variety={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

interface VarietyRowProps {
  variety: Variety
  index: number
}
const VarietyRow = ({variety, index}: VarietyRowProps) => {
  return (
    <div className={`flex items-center py-3 px-4 bg-${index % 2 === 0 ? 'transparent' : 'gray-100'}`}>
      <div className="w-1/2">{variety.name}</div>
      <div className="w-1/4">
        <Tooltip text={format(parseInt(variety.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(variety.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
      <div className="w-1/4">
        <Tooltip text={format(parseInt(variety.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(variety.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
    </div>
  )
}

export default ListVarietiesView
