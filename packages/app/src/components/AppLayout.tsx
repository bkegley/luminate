/** @jsx jsx */

import {
  jsx,
  Styled,
  Layout as ThemeLayout,
  Container,
  Footer as ThemeFooter,
  Header as ThemeHeader,
  Main,
} from 'theme-ui'
import Sidebar from './Sidebar'

import Header from './Header'
import {useUser} from '@luminate/gatsby-theme-luminate/src'

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  const {data, logout} = useUser()
  return (
    <Styled.root>
      <ThemeLayout sx={{bg: 'appBackground'}}>
        <ThemeHeader sx={{position: 'fixed', bg: 'green', width: '100%', top: 0}}>
          <Header user={data} logout={logout} />
        </ThemeHeader>
        <Container sx={{display: 'flex', maxWidth: 1440, pt: 5}}>
          <aside sx={{flexBasis: 99, flexGrow: 0, minWidth: 300}}>
            <Sidebar />
          </aside>
          <Main>{children}</Main>
        </Container>
        <ThemeFooter></ThemeFooter>
      </ThemeLayout>
    </Styled.root>
  )
}

export default Layout
