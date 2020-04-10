import React from 'react'
import {Switch, Route} from 'react-router-dom'
import CreateRole from './CreateRole'
import ListRoles from './ListRoles'
import UpdateRole from './UpdateRole'

const RolesPage = () => {
  return (
    <Switch>
      <Route path="/app/roles/create">
        <CreateRole />
      </Route>
      <Route path="/app/roles/:id">
        {props => {
          return <UpdateRole {...props} />
        }}
      </Route>
      <Route exact path="">
        <ListRoles />
      </Route>
    </Switch>
  )
}

export default RolesPage
