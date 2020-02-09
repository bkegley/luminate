/** @jsx jsx */
import {jsx, Flex, Box, Button} from 'theme-ui'
import {Link} from 'react-router-dom'
import {useLogout} from '@luminate/gatsby-theme-luminate/src'
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
      <Link to="/app/coffees">
        <Book sx={{color: 'primary', height: '1rem'}} />
        Coffees
      </Link>
      <Link to="/app/countries">Countries</Link>
      <Link to="/app/regions">Regions</Link>
      <Link to="/app/farms">Farms</Link>
      <Box>
        <Button type="button" variant="text" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Box>
    </Flex>
  )
}

export default Sidebar
