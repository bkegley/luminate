import React from 'react'

export interface LayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  sidebar?: React.ReactNode
}

const Layout = ({header, footer, sidebar, children}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header>{header}</header>
      <div className="container w-full mx-auto px-4 lg:px-6">
        <div className="flex mx-auto">
          {sidebar ? <aside className="sidebar-width w-1/6">{sidebar}</aside> : null}
          <main className="w-5/6">{children}</main>
        </div>
      </div>
      {footer ? <footer className="fixed bottom-0 left-0 w-full">{footer}</footer> : null}
    </div>
  )
}

export default Layout
