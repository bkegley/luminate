/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui'
import RegisterForm from '../components/RegisterForm'
import {Layout} from '@luminate/gatsby-theme-luminate/src'
import Header from '../components/RootHeader'

const RegisterPage = () => {
  return (
    <Layout header={<Header />}>
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
