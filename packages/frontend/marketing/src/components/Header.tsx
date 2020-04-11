import React from 'react'
import Logo from './Logo'
import {Button} from '@luminate/gatsby-theme-luminate/src'

const Header = () => {
  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <div className="">
        <Logo />
      </div>
      {/* <nav className="flex items-center">
        <ol className="flex items-center mr-6">
          <li className="mr-6">Home</li>
          <li className="mr-6">About</li>
          <li className="mr-6">Contact</li>
        </ol>
        <div>
          <Button>Register</Button>
        </div>
      </nav> */}
    </header>
  )
}

export default Header
