import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import CoffeesListView from './ListView'
import CoffeeCreatePage from './CreatePage'
import CoffeeDetailView from './DetailView'
import CoffeeUpdatePage from './UpdatePage'

const CoffeeRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={CoffeesListView} />
      <Route path={`${path}/:id/edit`} component={CoffeeUpdatePage} />
      <Route path={`${path}/create`} component={CoffeeCreatePage} />
      <Route path={`${path}/:id`} component={CoffeeDetailView} />
    </Switch>
  )
}

export default CoffeeRouter
