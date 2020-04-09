import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import CountryDetailView from './DetailView'
import CountryCreatePage from './CreatePage'
import CountriesListView from './ListView'
import CountryUpdatePage from './UpdatePage'

const CountryRouter = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={CountriesListView} />
      <Route path={`${path}/:id/edit`} component={CountryUpdatePage} />
      <Route path={`${path}/create`} component={CountryCreatePage} />
      <Route path={`${path}/:id`} component={CountryDetailView} />
    </Switch>
  )
}

export default CountryRouter
