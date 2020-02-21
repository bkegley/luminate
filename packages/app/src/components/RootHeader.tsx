/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button} from 'theme-ui'
import {useUser, Modal, useDialogState, DialogDisclosure} from '@luminate/gatsby-theme-luminate/src'
import {Link} from 'gatsby'
import LoginForm from './LoginForm'

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const {user, logout} = useUser()
  const loginDialog = useDialogState()
  return (
    <Box sx={{position: 'fixed', width: '100%', top: 0}}>
      <Modal dialog={loginDialog} aria-label="Login">
        <Box
          sx={{
            width: ['90vw', '75vw', '50vw'],
            maxWidth: '600px',
          }}
        >
          <LoginForm />
        </Box>
      </Modal>
      <Flex
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          maxWidth: 'contentWidth',
          mx: 'auto',
        }}
      >
        <Box>
          <Link to="/app" sx={{textDecoration: 'none'}}>
            <Heading as="h3" sx={{color: 'primary'}}>
              Luminate
            </Heading>
          </Link>
        </Box>
        <Flex sx={{alignItems: 'center'}}>
          <Box sx={{mx: 2}}>{user ? <Link to="/app">Go to App</Link> : <Link to="/register">Register</Link>}</Box>
          <Box sx={{ml: 2}}>
            {user ? (
              <Button type="button" onClick={() => logout()} variant="text">
                Logout
              </Button>
            ) : (
              <DialogDisclosure {...loginDialog} as={Button} variant="outline">
                Login
              </DialogDisclosure>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
