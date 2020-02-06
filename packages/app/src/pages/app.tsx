/** @jsx jsx */
import {jsx, Box} from 'theme-ui'
import {useUser, Layout} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Home from '../app/Home'
import Coffees from '../app/Coffees'
import Countries from '../app/Countries'
import Farms from '../app/Farms'
import Regions from '../app/Regions'
import Sidebar from '../components/Sidebar'
import Header from '../components/AppHeader'

const AppPage = () => {
  const {data, logout} = useUser()

  if (!data) {
    navigate('/login')
    return null
  }

  return (
    <BrowserRouter>
      <Layout header={<Header user={data} logout={logout} />} sidebar={<Sidebar />}>
        <Box sx={{pt: 6, px: 4}}>
          <Switch>
            <Route exact path="/app">
              <Home />
            </Route>
            <Route path="/app/coffees">
              <Coffees />
            </Route>
            <Route path="/app/countries">
              <Countries />
            </Route>
            <Route path="/app/regions">
              <Regions />
            </Route>
            <Route path="/app/farms">
              <Farms />
            </Route>
          </Switch>
        </Box>
      </Layout>
    </BrowserRouter>
  )
}

export default AppPage
