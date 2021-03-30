import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import ViewCreatePage from './CreatePage'
import ViewDetailView from './DetailView'
import ListViewsView from './ListView'

export const ViewsRouter = () => {
  const {url} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={url}>
        <ListViewsView />
      </Route>
      <Route path={`${url}/create`}>
        <ViewCreatePage />
      </Route>
      <Route path={`${url}/:id`}>
        <ViewDetailView />
      </Route>
    </Switch>
  )
}
