/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div sx={{display: 'flex', flexDirection: 'column'}}>
      <Link to="/app">
        <h3>Luminate</h3>
      </Link>
      <Link to="/app/coffees">Coffees</Link>
      <Link to="/app/countries">Countries</Link>
      <Link to="/app/regions">Regions</Link>
      <Link to="/app/farms">Farms</Link>
    </div>
  )
}

export default Sidebar
