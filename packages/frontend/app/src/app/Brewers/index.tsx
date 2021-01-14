import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import BrewersListView from './ListView'
import BrewerCreatePage from './CreatePage'
//import BrewerDetailView from './DetailView'
import BrewerUpdatePage from './UpdatePage'

const BrewerRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={BrewersListView} />
      <Route path={`${path}/create`} component={BrewerCreatePage} />
      <Route path={`${path}/:id/edit`} component={BrewerUpdatePage} />
      {/*
      <Route path={`${path}/:id`} component={BrewerDetailView} />
      */}
    </Switch>
  )
}

export default BrewerRouter
