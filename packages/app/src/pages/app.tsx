import React from 'react'
import {useUser} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../app/Home'
import Coffees from '../app/Coffees'

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
          <Route path="/app/coffees">
            <Coffees />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default IndexPage
