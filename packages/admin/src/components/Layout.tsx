/** @jsx jsx */

import {jsx, Layout as ThemeLayout, Container, Footer as ThemeFooter, Header as ThemeHeader, Main} from 'theme-ui'
import Sidebar from './Sidebar'

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <ThemeLayout>
      <ThemeHeader></ThemeHeader>
      <Container sx={{display: 'flex', maxWidth: 1440}}>
        <aside sx={{flexBasis: 99, flexGrow: 0, minWidth: 300}}>
          <Sidebar />
        </aside>
        <Main>{children}</Main>
      </Container>
      <ThemeFooter></ThemeFooter>
    </ThemeLayout>
  )
}

export default Layout
