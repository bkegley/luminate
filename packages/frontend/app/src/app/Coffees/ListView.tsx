import React from 'react'
import {useListCoffeesTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Coffee, Tooltip, Heading, Button, Card} from '@luminate/gatsby-theme-luminate/src'
import {formatDistanceToNow, format} from 'date-fns'

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
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <Heading>Coffee</Heading>
        </div>
        <div>
          <Button as="a" onClick={() => history.push(`${url}/create`)}>
            Create New
          </Button>
        </div>
      </div>
      <Card className="overflow-hidden">
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
    </div>
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
      <div className="w-1/4">
        <Tooltip text={format(parseInt(coffee.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(coffee.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
      <div className="w-1/4">
        <Tooltip text={format(parseInt(coffee.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(coffee.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </div>
    </div>
  )
}

export default ListCoffeesView
