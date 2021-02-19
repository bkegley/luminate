import React from 'react'
import {Page, Card} from '@luminate/components'
import {useListVarietiesTableQuery, Variety} from '../../graphql'
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
    <Page title="Variety" primaryAction={{text: 'Create New', onClick: () => history.push(`${url}/create`)}}>
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
    </Page>
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
        <span>{formatDistanceToNow(parseInt(variety.createdAt), {addSuffix: true})}</span>
      </div>
      <div className="w-1/4">
        <span>{formatDistanceToNow(parseInt(variety.updatedAt), {addSuffix: true})}</span>
      </div>
    </div>
  )
}

export default ListVarietiesView
