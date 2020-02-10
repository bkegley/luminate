/** @jsx jsx */
import {jsx, Flex, Box, Button} from 'theme-ui'
import {Link} from 'react-router-dom'
import {useLogout, StyledLink} from '@luminate/gatsby-theme-luminate/src'
import {Book} from 'react-feather'

const Sidebar = () => {
  const [logout, {client}] = useLogout()
  const handleLogoutClick = () => {
    client?.clearStore().then(() => logout())
  }
  return (
    <Flex
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        maxWidth: 'sidebar',
        pt: 6,
      }}
    >
      <StyledLink to="/app/coffees" variant="links.nav">
        <Book sx={{height: '1rem'}} />
        Coffees
      </StyledLink>
      <StyledLink to="/app/countries" variant="links.nav">
        Countries
      </StyledLink>
      <StyledLink to="/app/regions" variant="links.nav">
        Regions
      </StyledLink>
      <StyledLink to="/app/farms" variant="links.nav">
        Farms
      </StyledLink>
      <Box>
        <Button type="button" variant="text" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Box>
    </Flex>
  )
}

export default Sidebar
