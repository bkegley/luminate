import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import FarmDetailView from './DetailView'
import FarmsListView from './ListView'

const FarmRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={FarmsListView} />
      <Route path={`${path}/:id`} component={FarmDetailView} />
    </Switch>
  )
}

export default FarmRouter
