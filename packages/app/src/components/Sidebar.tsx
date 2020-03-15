/** @jsx jsx */
import {jsx, Flex, Box} from 'theme-ui'
import {useLogout, StyledLink} from '@luminate/gatsby-theme-luminate/src'
import {Book} from 'react-feather'

const Sidebar = () => {
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
      <StyledLink to="/app/coffees" variant="nav">
        <Book sx={{height: '1rem'}} />
        Coffees
      </StyledLink>
      <StyledLink to="/app/countries" variant="nav">
        Countries
      </StyledLink>
      <StyledLink to="/app/regions" variant="nav">
        Regions
      </StyledLink>
      <StyledLink to="/app/farms" variant="nav">
        Farms
      </StyledLink>
      <StyledLink to="/app/varieties" variant="nav">
        Varieties
      </StyledLink>
    </Flex>
  )
}

export default Sidebar
