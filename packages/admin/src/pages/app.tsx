import React from 'react'
import {useUser} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../app/Home'
import Roles from '../app/Roles'
import Scopes from '../app/Scopes'
import Users from '../app/Users'

const IndexPage = () => {
  const {data} = useUser()

  if (!data) {
    navigate('/login')
    return null
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/app">
            <Home />
          </Route>
          <Route path="/app/roles">
            <Roles />
          </Route>
          <Route path="/app/scopes">
            <Scopes />
          </Route>
          <Route path="/app/users">
            <Users />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default IndexPage
