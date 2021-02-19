import React from 'react'
import {Card, Page} from '@luminate/components'
import {Link, useHistory, useRouteMatch} from 'react-router-dom'
import {Brewer, useListBrewersQuery} from '../../graphql'

const BrewersListView = () => {
  const {error, loading, data} = useListBrewersQuery()
  const history = useHistory()
  const {url} = useRouteMatch()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Page title="Brewers" primaryAction={{text: 'Create New', onClick: () => history.push(`${url}/create`)}}>
      <Card>
        <div className="py-6">
          {data.listBrewers.edges.map(({node}, index) => {
            return (
              <div key={node?.id}>
                <Link to={`${url}/${node?.id}`}>
                  <BrewerRow brewer={node} index={index} />
                </Link>
              </div>
            )
          })}
        </div>
      </Card>
    </Page>
  )
}

interface BrewerRowProps {
  brewer: Brewer
  index: number
}
const BrewerRow = ({brewer, index}: BrewerRowProps) => {
  return (
    <div className={`flex items-center py-3 px-4 bg-${index % 2 === 0 ? 'transparent' : 'gray-100'}`}>
      <div className="w-1/4">{brewer.name}</div>
    </div>
  )
}

export default BrewersListView
