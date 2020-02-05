/** @jsx jsx */
import {jsx} from 'theme-ui'
import {UserFragmentFragment} from '@luminate/gatsby-theme-luminate/src'

interface HeaderProps {
  user: UserFragmentFragment | null
  logout: () => void
}

const Header = ({}: HeaderProps) => {
  return (
    <div>
      <h1>App header!</h1>
    </div>
  )
}

export default Header
