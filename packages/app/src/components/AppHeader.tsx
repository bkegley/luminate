/** @jsx jsx */
import {jsx, Flex, Box, Input, Avatar} from 'theme-ui'
import {UserFragmentFragment} from '@luminate/gatsby-theme-luminate/src'

interface HeaderProps {
  user: UserFragmentFragment | null
  logout: () => void
}

const Header = ({}: HeaderProps) => {
  return (
    <Flex
      sx={{
        position: 'fixed',
        bg: 'appBackground',
        width: '100%',
        alignItems: 'center',
        maxWidth: 'contentWidth',
        mx: 'auto',
        px: [4, 4, 6],
      }}
    >
      <Box sx={{flexGrow: 1, flexBasis: 'sidebar'}}>
        <h3>Luminate</h3>
      </Box>

      <Flex
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: 320,
          alignItems: 'center',
          px: 3,
          boxShadow: '0 .5rem .5rem -.5rem rgba(0,0,0,.2)',
        }}
      >
        <Box sx={{flex: 5}}>
          <Input sx={{bg: 'white'}} />
        </Box>
        <Box sx={{flex: 1, textAlign: 'end'}}>
          <Avatar sx={{bg: 'black'}} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
