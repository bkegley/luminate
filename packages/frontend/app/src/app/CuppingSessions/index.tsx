import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import CuppingSessionsListView from './ListView'
import CuppingSessionCreatePage from './CreatePage'
import CuppingSessionDetailView from './DetailView'
import CuppingSessionUpdatePage from './UpdatePage'
import SessionCoffeeDetailView from './Coffees/DetailView'
import ScoreSheetCreatePage from './Coffees/ScoreSheets/CreatePage'

const CuppingSessionRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={CuppingSessionsListView} />
      <Route path={`${path}/:id/edit`} component={CuppingSessionUpdatePage} />
      <Route path={`${path}/create`} component={CuppingSessionCreatePage} />
      <Route path={`${path}/:sessionId/coffees/:sessionCoffeeId/create`}>
        {({match}) => {
          return <ScoreSheetCreatePage sessionCoffeeId={match?.params.sessionCoffeeId} />
        }}
      </Route>
      <Route path={`${path}/:sessionId/coffees/:sessionCoffeeId`} component={SessionCoffeeDetailView} />
      <Route path={`${path}/:id`} component={CuppingSessionDetailView} />
    </Switch>
  )
}

export default CuppingSessionRouter
