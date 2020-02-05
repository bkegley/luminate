import React from 'react'
import {useUser} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Home from '../app/Home'
import Coffees from '../app/Coffees'
import Countries from '../app/Countries'
import Farms from '../app/Farms'
import Regions from '../app/Regions'

const AppPage = () => {
  const {data} = useUser()

  if (!data) {
    navigate('/login')
    return null
  }

  return (
    <BrowserRouter>
      <AppLayout>
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
      </AppLayout>
    </BrowserRouter>
  )
}

export default AppPage
