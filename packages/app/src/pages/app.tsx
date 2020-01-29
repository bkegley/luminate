import React from 'react'
import {useUser} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../app/Home'
import Coffees from '../app/Coffees'
import Countries from '../app/Countries'
import Farms from '../app/Farms'
import Regions from '../app/Regions'

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
          <Route path="/app/countries">
            <Countries />
          </Route>
          <Route path="/app/regions">
            <Regions />
          </Route>
          <Route path="/app/farms">
            <Farms />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default IndexPage