/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link, LinkProps, useRouteMatch} from 'react-router-dom'

export interface StyledLinkProps extends LinkProps {
  activeStyle?: object
  activeOnlyWhenExact?: boolean
  variant?: string
}

const StyledLink = ({activeOnlyWhenExact, activeStyle = {color: 'primary'}, variant, ...props}: StyledLinkProps) => {
  const {to} = props
  const match = useRouteMatch({path: to as string, exact: activeOnlyWhenExact})
  return (
    <Link
      {...props}
      className={match ? 'active' : ''}
      sx={{textDecoration: 'none', '&.active': activeStyle, variant: variant}}
    />
  )
}

export default StyledLink
