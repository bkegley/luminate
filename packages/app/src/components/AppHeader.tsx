/** @jsx jsx */
import {jsx, Flex, Box, Button, Card, Input, Avatar, Heading} from 'theme-ui'
import React from 'react'
import {Menu, MenuSeparator, StyledLink, useUser} from '@luminate/gatsby-theme-luminate/src'

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const {user, logout, logoutMeta} = useUser()
  const {client} = logoutMeta
  const handleLogoutClick = () => {
    client?.clearStore().then(() => logout())
  }
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
            <Menu
              as={Card}
              sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2, pt: 2}}
              button={<Avatar src="https://picsum.photos/48/48" />}
            >
              {menu => {
                return (
                  <React.Fragment>
                    <Box sx={{my: 1, mx: 3, fontSize: 0}}>
                      <StyledLink {...menu} to="/app/account" variant="links.nav">
                        Account
                      </StyledLink>
                    </Box>
                    <MenuSeparator {...menu} sx={{width: '100%', borderTopColor: 'greys.0', borderWidth: '0.5px'}} />
                    <Box sx={{my: 1, mx: 3}}>
                      <Button type="button" onClick={handleLogoutClick} variant="text" sx={{fontSize: 0}}>
                        Log Out
                      </Button>
                    </Box>
                  </React.Fragment>
                )
              }}
            </Menu>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
