import React from 'react'
import {Switch, Route} from 'react-router-dom'
import CreateUser from './CreateUser'
import ListUsers from './ListUsers'
import UpdateUser from './UpdateUser'

const UsersPage = () => {
  return (
    <Switch>
      <Route path="/app/users/create">
        <CreateUser />
      </Route>
      <Route path="/app/users/:id">
        {props => {
          return <UpdateUser {...props} />
        }}
      </Route>
      <Route exact path="">
        <ListUsers />
      </Route>
    </Switch>
  )
}

export default UsersPage
