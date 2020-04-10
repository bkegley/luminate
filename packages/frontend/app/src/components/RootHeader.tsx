import React from 'react'
import {useUser, Heading, Button, Modal, useDialogState, DialogDisclosure} from '@luminate/gatsby-theme-luminate/src'
import {Link} from 'gatsby'
import LoginForm from './LoginForm'

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const {user, logout} = useUser()
  const loginDialog = useDialogState()
  return (
    <div className="fixed w-full top-0">
      <Modal className="container mx-auto bg-white p-3 rounded-md" dialog={loginDialog} aria-label="Login">
        <div className="">
          <LoginForm />
        </div>
      </Modal>
      <div className="flex w-full items-center justify-between py-2 mx-auto container">
        <div>
          <Link to="/app" className="underline-none">
            <Heading as="h3" className="text-primary-600">
              Luminate
            </Heading>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="mx-2">{user ? <Link to="/app">Go to App</Link> : <Link to="/register">Register</Link>}</div>
          <div className="ml-2">
            {user ? (
              <Button type="button" onClick={() => logout()} variant="text">
                Logout
              </Button>
            ) : (
              <DialogDisclosure {...loginDialog} as={Button} variant="outline">
                Login
              </DialogDisclosure>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
