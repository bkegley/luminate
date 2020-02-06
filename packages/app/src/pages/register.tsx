/** @jsx jsx */
import {jsx} from 'theme-ui'
import RegisterForm from '../components/RegisterForm'
import Layout from '../components/RootLayout'
import {Box, Heading} from '@luminate/gatsby-theme-luminate/src'

const RegisterPage = () => {
  return (
    <Layout>
      <Box>
        <Box sx={{mb: 4}}>
          <Heading as="h1">Register</Heading>
        </Box>
        <Box>
          <RegisterForm />
        </Box>
      </Box>
    </Layout>
  )
}

export default RegisterPage
