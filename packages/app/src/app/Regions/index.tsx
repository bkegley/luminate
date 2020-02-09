import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import RegionDetailView from './DetailView'
import RegionsListView from './ListView'

const RegionRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={RegionsListView} />
      <Route path={`${path}/:id`} component={RegionDetailView} />
    </Switch>
  )
}

export default RegionRouter
