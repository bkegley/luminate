/** @jsx jsx */
import {jsx, Flex, Box} from 'theme-ui'

export interface LayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  sidebar?: React.ReactNode
}

const Layout = ({header, footer, sidebar, children}: LayoutProps) => {
  return (
    <Flex sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bg: 'appBackground'}}>
      <header>{header}</header>
      <Box sx={{maxWidth: 'contentWidth', mx: 'auto', px: [4, 4, 6], width: '100%'}}>
        <Box sx={{display: 'flex', flexWrap: 'wrap', mx: 'auto'}}>
          {sidebar ? <aside sx={{flexGrow: 1, flexBasis: 'sidebar'}}>{sidebar}</aside> : null}
          <main sx={{flexGrow: 99999, flexBasis: 0, minWidth: 320}}>{children}</main>
        </Box>
      </Box>
      {footer ? <footer sx={{position: 'fixed', bottom: 0, left: 0, width: '100%'}}>{footer}</footer> : null}
    </Flex>
  )
}

export default Layout
