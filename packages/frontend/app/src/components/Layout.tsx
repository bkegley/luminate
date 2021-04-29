import React from 'react'
import {Sidebar} from './Sidebar'
import {Header} from './Header'
import {useDarkMode} from '../hooks/useDarkMode'
import {DarkModeProvider} from '../hooks/DarkModeProvider'
import {useUser} from '@luminate/gatsby-theme-luminate/src'

export interface LayoutProps {
  children: React.ReactNode
}

const InnerLayout = ({children}: LayoutProps) => {
  const [open, setOpen] = React.useState(false)
  const {darkMode} = useDarkMode()
  return (
    <div className={darkMode === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen h-full bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
        <Header open={open} setOpen={setOpen} />
        <div className="flex">
          <Sidebar open={open} setOpen={setOpen} />
          <div className="flex flex-col min-w-0 flex-1">
            <main className="relative flex-1 flow-y-auto focus:outline-none md:px-8 lg:px-12 mb-20" tabIndex={0}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Layout = ({children}: LayoutProps) => {
  const {user} = useUser()

  return (
    <DarkModeProvider initialTheme={user.theme}>
      <InnerLayout>{children}</InnerLayout>
    </DarkModeProvider>
  )
}
