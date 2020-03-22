import React from 'react'
import {useListUsersQuery} from '../../graphql'
import {Link} from 'react-router-dom'

const ListUsers = () => {
  const {error, loading, data} = useListUsersQuery()

  if (error || loading) {
    return null
  }

  return (
    <div>
      <div>
        <Link to="/app/users/create">Create New</Link>
      </div>
      {data?.listUsers.edges.map(({node}) => {
        if (!node) return null
        return (
          <div key={node.id}>
            <Link to={`/app/users/${node.id}`}>
              <h3>{node.username}</h3>
            </Link>
            <p>{node.firstName}</p>
            <p>{node.lastName}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ListUsers
