import React from 'react'
import {Switch, Route, useRouteMatch, useLocation} from 'react-router-dom'
import Home from './Home'
import Account from './Account'
import Coffees from './Coffees'
import Countries from './Countries'
import CuppingSessions from './CuppingSessions'
import Farms from './Farms'
import Regions from './Regions'
import Varieties from './Varieties'

const AppRouter = () => {
  const route = useRouteMatch()
  console.log({route})
  const location = useLocation()
  console.log({location})
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/coffees">
        <Coffees />
      </Route>
      <Route path="/countries">
        <Countries />
      </Route>
      <Route path="/regions">
        <Regions />
      </Route>
      <Route path="/farms">
        <Farms />
      </Route>
      <Route path="/varieties">
        <Varieties />
      </Route>
      <Route path="/cupping-sessions">
        <CuppingSessions />
      </Route>
    </Switch>
  )
}

export default AppRouter
