/** @jsx jsx */
import {
  jsx,
  Styled,
  Layout as ThemeLayout,
  Container,
  Footer as ThemeFooter,
  Header as ThemeHeader,
  Main,
} from 'theme-ui'
import {useUser, Box, Flex, Heading, Button, UserFragmentFragment, Modal} from '@luminate/gatsby-theme-luminate/src'
import {Link} from 'gatsby'
import LoginForm from './LoginForm'

interface HeaderProps {
  user: UserFragmentFragment | null
  logout: () => void
}

export const Header = ({user, logout}: HeaderProps) => {
  return (
    <Flex sx={{width: '100%', alignItems: 'center', justifyContent: 'space-between', py: 2}}>
      <Box>
        <Link to="/">
          <Heading>Luminate</Heading>
        </Link>
      </Box>
      <Flex sx={{alignItems: 'center'}}>
        <Box sx={{mx: 2}}>{user ? <Link to="/app">Go to App</Link> : <Link to="/register">Register</Link>}</Box>
        <Box sx={{ml: 2}}>
          {user ? (
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
  )
}

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  const {data, logout, logoutMeta} = useUser()
  const handleLogoutClick = () => {
    logoutMeta.client?.resetStore().then(logout)
  }
  return (
    <Styled.root>
      <ThemeLayout sx={{bg: 'appBackground'}}>
        <ThemeHeader>
          <Header user={data} logout={handleLogoutClick} />
        </ThemeHeader>
        <Container sx={{display: 'flex', maxWidth: 1440}}>
          <Main>{children}</Main>
        </Container>
        <ThemeFooter></ThemeFooter>
      </ThemeLayout>
    </Styled.root>
  )
}

export default Layout
