import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Coffees from './Coffees'
import Countries from './Countries'
import Farms from './Farms'
import Regions from './Regions'

const AppRouter = () => {
  return (
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
  )
}

export default AppRouter
