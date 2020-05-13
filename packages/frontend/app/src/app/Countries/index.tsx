import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import CountryDetailView from './DetailView'
import CountriesListView from './ListView'

const CountryRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={CountriesListView} />
      <Route path={`${path}/:id`} component={CountryDetailView} />
    </Switch>
  )
}

export default CountryRouter
