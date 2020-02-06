/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui'
import RegisterForm from '../components/RegisterForm'
import Layout from '../components/RootLayout'

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
