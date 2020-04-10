import React from 'react'
import {
  Menu,
  MenuSeparator,
  StyledLink,
  useUser,
  Heading,
  Input,
  Avatar,
  Button,
} from '@luminate/gatsby-theme-luminate/src'

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const {user, logout, logoutMeta} = useUser()
  const {client} = logoutMeta
  const handleLogoutClick = () => {
    client?.clearStore().then(() => logout())
  }
  return (
    <div className="fixed  w-full z-10 bg-gray-200">
      <div className="flex items-center container mx-auto px-4 lg:px-6">
        <div className="flex-grow w-1/6">
          <StyledLink to="/app" className="hover:no-underline">
            <Heading as="h3" className="text-primary-600">
              Luminate
            </Heading>
          </StyledLink>
        </div>

        <div className="flex flex-row flex-grow items-center px-4 header-shadow py-2 w-5/6">
          <div className="w-5/6 text-center">
            <Input className="max-w-sm w-full" />
          </div>
          <div className="w-1/6 ml-2">
            <Menu
              className="absolute flex flex-col items-start mt-2 pt-2 bg-white rounded"
              button={<Avatar src="https://picsum.photos/48/48" />}
            >
              {menu => {
                return (
                  <>
                    <div className="my-1 mx-3 text-size-xs">
                      <StyledLink {...menu} to="/app/account" className="text-sm" variant="nav">
                        Account
                      </StyledLink>
                    </div>
                    <MenuSeparator {...menu} className="w-full border-t border-gray-100" />
                    <div className="my-1 mx-3">
                      <Button type="button" onClick={handleLogoutClick} variant="text" className="text-xs">
                        Log Out
                      </Button>
                    </div>
                  </>
                )
              }}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
