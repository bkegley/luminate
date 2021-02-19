import React from 'react'
import {useListCoffeesTableQuery, Coffee} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Card, Page} from '@luminate/components'

interface Props extends RouteComponentProps {}

const ListCoffeesView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListCoffeesTableQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Page title="Coffee" primaryAction={{text: 'Create New', onClick: () => history.push(`${url}/create`)}}>
      <Card>
        {data.listCoffees.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`}>
                <CoffeeRow coffee={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </Page>
  )
}

interface CoffeeRowProps {
  coffee: Coffee
  index: number
}
const CoffeeRow = ({coffee, index}: CoffeeRowProps) => {
  return (
    <div className={`flex items-center py-3 px-4 bg-${index % 2 === 0 ? 'transparent' : 'gray-100'}`}>
      <div className="w-1/4">{coffee.name}</div>
      <div className="w-1/4">{coffee.country?.name}</div>
    </div>
  )
}

export default ListCoffeesView
