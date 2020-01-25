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
    </div>
  )
}

export default Sidebar
