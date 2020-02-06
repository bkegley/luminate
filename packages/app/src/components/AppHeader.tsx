/** @jsx jsx */
import {jsx, Flex, Box, Input, Avatar, Heading} from 'theme-ui'
import {UserFragmentFragment} from '@luminate/gatsby-theme-luminate/src'

interface HeaderProps {
  user: UserFragmentFragment | null
  logout: () => void
}

const Header = ({}: HeaderProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bg: 'appBackground',
        width: '100%',
        zIndex: 10,
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          maxWidth: 'contentWidth',
          mx: 'auto',
          px: [4, 4, 6],
        }}
      >
        <Box sx={{flexGrow: 1, flexBasis: 'sidebar'}}>
          <Heading as="h3" sx={{color: 'primary'}}>
            Luminate
          </Heading>
        </Box>

        <Flex
          sx={{
            flexGrow: 99999,
            flexBasis: 0,
            minWidth: 320,
            alignItems: 'center',
            px: 4,
            boxShadow: '0 .5rem .5rem -.5rem rgba(0,0,0,.2)',
            py: 2,
          }}
        >
          <Box sx={{flex: 5}}>
            <Input sx={{bg: 'white', maxWidth: 400, mx: 'auto'}} />
          </Box>
          <Box sx={{flex: 1, textAlign: 'end'}}>
            <Avatar src="https://picsum.photos/48/48" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
