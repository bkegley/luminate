/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link} from 'gatsby'
import Layout from '../components/RootLayout'
import {useUser} from '@luminate/gatsby-theme-luminate/src'

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <h3>Login?</h3>
        <Link to="/login">Go to login</Link>
      </div>
      <div>
        <h3>Register?</h3>
        <Link to="/register">Go to register</Link>
      </div>
    </Layout>
  )
}

export default IndexPage
