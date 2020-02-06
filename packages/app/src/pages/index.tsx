/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link} from 'gatsby'
import Layout from '../components/RootLayout'

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <h3>Register?</h3>
        <Link to="/register">Go to register</Link>
      </div>
    </Layout>
  )
}

export default IndexPage
