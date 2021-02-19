import React from 'react'
import {Heading, Button, Card} from '@luminate/components'
import {useListFarmsTableQuery, Farm} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps {}

const ListFarmsView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListFarmsTableQuery()

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
          <Heading>Farm</Heading>
        </div>
        <div>
          <Button onClick={() => history.push(`${url}/create`)}>Create New</Button>
        </div>
      </div>
      <Card>
        {data.listFarms.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`}>
                <FarmRow farm={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

interface FarmRowProps {
  farm: Farm
  index: number
}
const FarmRow = ({farm, index}: FarmRowProps) => {
  return (
    <div className={`flex items-center bg-${index % 2 === 0 ? 'transparent' : 'gray-100'} py-3 px-4`}>
      <div className="w-1/4">{farm.name}</div>
      <div className="w-1/4">{farm.country?.name}</div>
    </div>
  )
}

export default ListFarmsView
