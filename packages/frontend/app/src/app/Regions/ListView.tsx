import React from 'react'
import {useListRegionsTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Heading, Button, Card, Region, Tooltip} from '@luminate/gatsby-theme-luminate/src'
import {formatDistanceToNow, format} from 'date-fns'

interface Props extends RouteComponentProps {}

const ListRegionsView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListRegionsTableQuery()

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
          <Heading>Region</Heading>
        </div>
        <div>
          <Button onClick={() => history.push(`${url}/create`)}>Create New</Button>
        </div>
      </div>
      <Card>
        {data.listRegions.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`}>
                <RegionRow region={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

interface RegionRowProps {
  region: Region
  index: number
}
const RegionRow = ({region, index}: RegionRowProps) => {
  return (
    <div className={`flex items-center py-3 px-4 bg-${index % 2 === 0 ? 'transparent' : 'gray-100'}`}>
      <div className="w-1/4">{region.name}</div>
      <div className="w-1/4">{region.country?.name}</div>
      <div className="w-1/4">
        <Tooltip text={format(parseInt(region.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(region.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
      <div className="w-1/4">
        <Tooltip text={format(parseInt(region.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(region.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
    </div>
  )
}

export default ListRegionsView
