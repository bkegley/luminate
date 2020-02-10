/** @jsx jsx */
import {jsx, Box} from 'theme-ui'
import {useUser, Layout} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {BrowserRouter} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/AppHeader'
import App from '../app'

const AppPage = () => {
  const {data} = useUser()

  if (!data) {
    if (typeof window !== 'undefined') {
      navigate('/login')
    }
    return null
  }

  return (
    <BrowserRouter>
      <Layout header={<Header />} sidebar={<Sidebar />}>
        <Box sx={{pt: 6, px: 4, mb: 6}}>
          <App />
        </Box>
      </Layout>
    </BrowserRouter>
  )
}

export default AppPage
