/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Switch, Route} from 'react-router-dom'
import CreateScope from './CreateScope'
import ListScopes from './ListScopes'
import UpdateScope from './UpdateScope'

const ScopesPage = () => {
  return (
    <Switch>
      <Route path="/app/scopes/create">
        <CreateScope />
      </Route>
      <Route path="/app/scopes/:id">
        {props => {
          return <UpdateScope {...props} />
        }}
      </Route>
      <Route exact path="">
        <ListScopes />
      </Route>
    </Switch>
  )
}

export default ScopesPage
