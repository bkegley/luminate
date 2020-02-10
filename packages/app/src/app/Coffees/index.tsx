import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import CoffeesListView from './ListView'
import CoffeeCreatePage from './CreatePage'
import CoffeeDetailView from './DetailView'

const CoffeeRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={CoffeesListView} />
      <Route path={`${path}/create`} component={CoffeeCreatePage} />
      <Route path={`${path}/:id`} component={CoffeeDetailView} />
    </Switch>
  )
}

export default CoffeeRouter
