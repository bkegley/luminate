import React from 'react'
import Sidebar, {NavigationIcons} from './Sidebar'
import Header from './Header'

export interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  const [{activeNavItem, open}, setActiveNavItem] = React.useState<{activeNavItem: NavigationIcons; open: boolean}>({
    activeNavItem: 'home',
    open: false,
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <Sidebar
        activeNavItem={activeNavItem}
        navMenuOpen={open}
        closeMenu={() => setActiveNavItem({activeNavItem, open: false})}
        setActiveNavItem={setActiveNavItem}
      />
      <main className={`main relative mt-16 ${open ? 'sidebar-open' : 'ml-16'}`}>
        <div className="w-5/6 mx-auto">{children}</div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full" />
    </div>
  )
}

export default Layout
