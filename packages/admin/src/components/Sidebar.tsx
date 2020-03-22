import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="flex flex-col">
      <h3>Sidebar</h3>
      <Link to="/app/users">Users</Link>
      <Link to="/app/roles">Roles</Link>
      <Link to="/app/scopes">Scopes</Link>
    </div>
  )
}

export default Sidebar
