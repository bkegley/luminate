/** @jsx jsx */
import {jsx, Flex, Box, Card, Heading, Text} from 'theme-ui'
import {Layout} from '@luminate/gatsby-theme-luminate/src'
import Header from '../components/RootHeader'
import LoginForm from '../components/LoginForm'
import {Link} from 'gatsby'

const LoginPage = () => {
  return (
    <Layout header={<Header />}>
      <Card sx={{maxWidth: 900, mx: 'auto', mt: 5}}>
        <Flex sx={{flexDirection: ['column', 'column', 'row']}}>
          <Flex
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 2,
              px: 4,
              py: 5,
              bg: 'primary',
              color: 'white',
            }}
          >
            <Text>
              Coffee is better shared. Luminate makes it easy to share the world's greatest coffees so that the world
              can make greater coffee.
            </Text>
            <Box sx={{textAlign: 'center'}}>
              <Text>Don't have an account?</Text>
              <Link to="/register" sx={{color: 'inherit'}}>
                Get started!
              </Link>
            </Box>
          </Flex>
          <Box sx={{flex: 3, px: 4, py: 5}}>
            <Heading sx={{mb: 3}}>Account Login</Heading>
            <LoginForm />
          </Box>
        </Flex>
      </Card>
    </Layout>
  )
}

export default LoginPage
