import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Account from './Account'
import Coffees from './Coffees'
import Countries from './Countries'
import Farms from './Farms'
import Regions from './Regions'
import Varieties from './Varieties'

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/app">
        <Home />
      </Route>
      <Route path="/app/account">
        <Account />
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
      <Route path="/app/varieties">
        <Varieties />
      </Route>
    </Switch>
  )
}

export default AppRouter
