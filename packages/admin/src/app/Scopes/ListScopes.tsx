/** @jsx jsx */

import {jsx} from 'theme-ui'
import {useListScopesQuery} from '../../graphql'
import {Link} from 'react-router-dom'

const ListScopes = () => {
  const {error, loading, data} = useListScopesQuery()

  if (error || loading) {
    return null
  }

  return (
    <div>
      <div>
        <Link to="/app/scopes/create">Create New</Link>
      </div>
      {data?.listScopes.edges.map(({node}) => {
        if (!node) return null
        return (
          <div key={node.id}>
            <Link to={`/app/scopes/${node.id}`}>
              <h3>{node.name}</h3>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default ListScopes
