import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import FarmsListView from './ListView'
import FarmCreatePage from './CreatePage'
import FarmDetailView from './DetailView'

const FarmRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={FarmsListView} />
      <Route path={`${path}/create`} component={FarmCreatePage} />
      <Route path={`${path}/:id`} component={FarmDetailView} />
    </Switch>
  )
}

export default FarmRouter
