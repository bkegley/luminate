import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import CoffeeDetailView from './DetailView'
import CoffeesListView from './ListView'

const CoffeeRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={CoffeesListView} />
      <Route path={`${path}/:id`} component={CoffeeDetailView} />
    </Switch>
  )
}

export default CoffeeRouter
