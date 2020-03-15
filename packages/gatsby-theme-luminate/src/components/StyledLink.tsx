/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link, LinkProps, useRouteMatch} from 'react-router-dom'

export interface StyledLinkProps extends LinkProps {
  activeClassName?: string
  activeOnlyWhenExact?: boolean
  variant?: 'text' | 'nav'
}

const StyledLink = ({
  activeOnlyWhenExact,
  activeClassName = 'text-primary-600',
  variant = 'text',
  className,
  ...props
}: StyledLinkProps) => {
  const {to} = props
  const match = useRouteMatch({path: to as string, exact: activeOnlyWhenExact})
  return (
    <Link
      {...props}
      className={`link-${variant ? variant : ''} no-underline ${match ? activeClassName : ''} ${
        className ? className : ''
      }`}
    />
  )
}

export default StyledLink
