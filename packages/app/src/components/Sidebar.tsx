/** @jsx jsx */
import {jsx, Box, Button} from 'theme-ui'
import {Link} from 'react-router-dom'
import {useLogout} from '@luminate/gatsby-theme-luminate/src'

const Sidebar = () => {
  const [logout, {client}] = useLogout()
  const handleLogoutClick = () => {
    client?.clearStore().then(() => logout())
  }
  return (
    <div sx={{display: 'flex', flexDirection: 'column', position: 'fixed', pt: 6}}>
      <Link to="/app/coffees">Coffees</Link>
      <Link to="/app/countries">Countries</Link>
      <Link to="/app/regions">Regions</Link>
      <Link to="/app/farms">Farms</Link>
      <Box>
        <Button type="button" variant="text" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Box>
    </div>
  )
}

export default Sidebar
