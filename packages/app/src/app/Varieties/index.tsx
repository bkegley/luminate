import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import VarietiesListView from './ListView'
import VarietyCreatePage from './CreatePage'
import VarietyDetailView from './DetailView'
import VarietyUpdatePage from './UpdatePage'

const VarietyRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={VarietiesListView} />
      <Route path={`${path}/:id/edit`} component={VarietyUpdatePage} />
      <Route path={`${path}/create`} component={VarietyCreatePage} />
      <Route path={`${path}/:id`} component={VarietyDetailView} />
    </Switch>
  )
}

export default VarietyRouter
