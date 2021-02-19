import React from 'react'
import {Page, Card} from '@luminate/components'
import {useListRegionsTableQuery, Region} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'

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
    <Page title="Region" primaryAction={{text: 'Create New', onClick: () => history.push(`${url}/create`)}}>
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
    </Page>
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
    </div>
  )
}

export default ListRegionsView
