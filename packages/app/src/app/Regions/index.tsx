import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import RegionsListView from './ListView'
import RegionCreatePage from './CreatePage'
import RegionDetailView from './DetailView'
import RegionUpdatePage from './UpdatePage'

const RegionRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={RegionsListView} />
      <Route path={`${path}/:id/edit`} component={RegionUpdatePage} />
      <Route path={`${path}/create`} component={RegionCreatePage} />
      <Route path={`${path}/:id`} component={RegionDetailView} />
    </Switch>
  )
}

export default RegionRouter
