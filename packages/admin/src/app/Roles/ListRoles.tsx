/** @jsx jsx */

import {jsx} from 'theme-ui'
import {useListRolesQuery} from '../../graphql'
import {Link} from 'react-router-dom'

const ListRoles = () => {
  const {error, loading, data} = useListRolesQuery()

  if (error || loading) {
    return null
  }

  return (
    <div>
      <div>
        <Link to="/app/roles/create">Create New</Link>
      </div>
      {data?.listRoles.edges.map(({node}) => {
        if (!node) return null
        return (
          <div key={node.id}>
            <Link to={`/app/roles/${node.id}`}>
              <h3>{node.name}</h3>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default ListRoles
