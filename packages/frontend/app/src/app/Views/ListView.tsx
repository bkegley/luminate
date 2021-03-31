import React from 'react'
import {Page, Card} from '@luminate/components'
import {useListViewsQuery, View} from '../../graphql'
import {Link, useHistory, useRouteMatch} from 'react-router-dom'

interface Props {}

const ListViewsView = ({}: Props) => {
  const match = useRouteMatch()
  const history = useHistory()
  const {url} = match
  const {data, error, loading} = useListViewsQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Page title="Views" primaryAction={{text: 'Create New', onClick: () => history.push(`${url}/create`)}}>
      <Card>
        {data.listViews.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`}>
                <ViewRow view={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </Page>
  )
}

interface ViewRowProps {
  view: View
  index: number
}
const ViewRow = ({view, index}: ViewRowProps) => {
  return (
    <div
      className={`flex items-center py-3 px-4 ${index % 2 === 0 ? 'bg-transparent' : 'bg-gray-100 dark:bg-gray-800'}`}
    >
      <div className="w-1/2">{view.name}</div>
    </div>
  )
}

export default ListViewsView
