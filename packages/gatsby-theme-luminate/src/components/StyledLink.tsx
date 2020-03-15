/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link, LinkProps, useRouteMatch} from 'react-router-dom'

export interface StyledLinkProps extends LinkProps {
  activeClassName?: string
  activeOnlyWhenExact?: boolean
}

const StyledLink = ({activeOnlyWhenExact, activeClassName = 'text-primary-600', ...props}: StyledLinkProps) => {
  const {to} = props
  const match = useRouteMatch({path: to as string, exact: activeOnlyWhenExact})
  return <Link {...props} className={`no-underline ${match ? activeClassName : ''}`} />
}

export default StyledLink
