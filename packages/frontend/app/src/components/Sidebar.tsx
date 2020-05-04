import React from 'react'
import {StyledLink} from '@luminate/gatsby-theme-luminate/src'
import {Book} from 'react-feather'

const Sidebar = () => {
  return (
    <div className="flex flex-col fixed pt-24 sidebar-width">
      <StyledLink to="/coffees" variant="nav">
        <Book className="h-4" />
        Coffees
      </StyledLink>
      <StyledLink to="/countries" variant="nav">
        Countries
      </StyledLink>
      <StyledLink to="/regions" variant="nav">
        Regions
      </StyledLink>
      <StyledLink to="/farms" variant="nav">
        Farms
      </StyledLink>
      <StyledLink to="/varieties" variant="nav">
        Varieties
      </StyledLink>
      <StyledLink to="/cupping-sessions" variant="nav">
        Cupping Sessions
      </StyledLink>
    </div>
  )
}

export default Sidebar
