/** @jsx jsx */

import {jsx, Layout as ThemeLayout, Container, Footer as ThemeFooter, Header as ThemeHeader, Main} from 'theme-ui'

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <ThemeLayout>
      <ThemeHeader></ThemeHeader>
      <Main>
        <Container sx={{maxWidth: 1440}}>{children}</Container>
      </Main>
      <ThemeFooter></ThemeFooter>
    </ThemeLayout>
  )
}

export default Layout
