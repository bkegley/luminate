/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button} from 'theme-ui'
import {useUser, UserFragmentFragment, Modal} from '@luminate/gatsby-theme-luminate/src'
import {Link} from 'gatsby'
import LoginForm from './LoginForm'

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const {data, logout} = useUser()
  return (
    <Box sx={{position: 'fixed', width: '100%', top: 0}}>
      <Flex sx={{width: '100%', alignItems: 'center', justifyContent: 'space-between', py: 2}}>
        <Box>
          <Link to="/">
            <Heading>Luminate</Heading>
          </Link>
        </Box>
        <Flex sx={{alignItems: 'center'}}>
          <Box sx={{mx: 2}}>{data ? <Link to="/app">Go to App</Link> : <Link to="/register">Register</Link>}</Box>
          <Box sx={{ml: 2}}>
            {data ? (
              <Button type="button" onClick={logout} variant="text">
                Logout
              </Button>
            ) : (
              <Modal
                disclosure={
                  <Button type="button" variant="outline">
                    Login
                  </Button>
                }
                aria-label="Login"
              >
                {dialog => {
                  return (
                    <Box
                      sx={{
                        width: ['90vw', '75vw', '50vw'],
                        maxWidth: '600px',
                      }}
                    >
                      <LoginForm />
                    </Box>
                  )
                }}
              </Modal>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
