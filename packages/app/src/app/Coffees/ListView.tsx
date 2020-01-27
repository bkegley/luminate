/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useListCoffeesQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps {}

const ListCoffeesView = ({match}: Props) => {
  const {url} = match
  const {data, error, loading} = useListCoffeesQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <div>
      {data.listCoffees.edges.map(({node}) => {
        return (
          <div key={node?.id}>
            <Link to={`${url}/${node?.id}`}>
              <h2>{node?.name}</h2>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default ListCoffeesView
