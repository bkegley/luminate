/** @jsx jsx */

import {jsx, Flex, Box} from 'theme-ui'
import Sidebar from './Sidebar'

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <Flex sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bg: 'appBackground'}}>
      <header sx={{position: 'fixed', bg: 'green', width: '100%', top: 0}}></header>
      <Box sx={{maxWidth: 'contentWidth', mx: 'auto', px: [4, 4, 6], width: '100%'}}>
        <Box sx={{pt: 6, display: 'flex', flexWrap: 'wrap', maxWidth: 1440, mx: 'auto'}}>
          <aside sx={{flexGrow: 1, flexBasis: 'sidebar'}}>
            <Sidebar />
          </aside>
          <main sx={{flexGrow: 99999, flexBasis: 0, minWidth: 320}}>{children}</main>
        </Box>
      </Box>
      <footer sx={{width: '100%'}}>Footer content</footer>
    </Flex>
  )
}

export default Layout
