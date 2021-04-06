import React from 'react'
import {Transition} from '@headlessui/react'
import {Icon, IconTypesEnum} from '@luminate/components'
import {Link, useRouteMatch} from 'react-router-dom'

export interface SidebarProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface INavItem {
  text: string
  description: string
  to: string
  icon: IconTypesEnum
  activeOnlyWhenExact?: boolean
}

const navItems: INavItem[] = [
  {icon: IconTypesEnum.HOME, to: '/', text: 'Home', description: 'Home', activeOnlyWhenExact: true},
  {icon: IconTypesEnum.BOOK_OPEN, to: '/posts', text: 'Posts', description: 'posts'},
  {icon: IconTypesEnum.PENCIL, to: '/coffees', text: 'Coffees', description: 'coffees'},
  {icon: IconTypesEnum.BEAKER, to: '/brewers', text: 'Brewers', description: 'brewers'},
  {icon: IconTypesEnum.BOOKMARK, to: '/countries', text: 'Countries', description: 'countries'},
  {icon: IconTypesEnum.BOOKMARK, to: '/varieties', text: 'Varieties', description: 'varieties'},
  {icon: IconTypesEnum.BOOKMARK, to: '/cupping-sessions', text: 'Cupping', description: 'cupping sessions'},
  {icon: IconTypesEnum.EYE, to: '/views', text: 'Views', description: 'views'},
  {icon: IconTypesEnum.COG, to: '/account', text: 'Account', description: 'account'},
]

export const Sidebar = ({open, setOpen}: SidebarProps) => {
  return (
    <>
      <Transition show={open} enter="duration-100" className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            className="fixed inset-0"
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div onClick={() => setOpen(false)} className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </Transition.Child>
          <Transition.Child
            tabIndex={0}
            className="relative flex flex-col w-28 bg-gray-50 dark:bg-gray-800 focus:outline-none"
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <nav aria-label="Sidebar" className="mt-5 flex-1 h-0 overflow-y-auto">
              <div className="py-3 px-3 space-y-3">
                {navItems.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <NavItem key={index} item={item} />
                    </React.Fragment>
                  )
                })}
              </div>
            </nav>
          </Transition.Child>
        </div>
      </Transition>
      <div className="hidden md:flex md:flex-shrink-0">
        <nav
          aria-label="Sidebar"
          className="hidden md:block md:flex-shrink-0 bg-gray-50 dark:bg-gray-800 md:overflow-y-auto"
        >
          <div className="relative w-40 flex flex-col py-3 px-3 space-y-3">
            {navItems.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <NavItem key={index} item={item} />
                </React.Fragment>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}

interface NavItemProps {
  item: INavItem
}

const NavItem = ({item}: NavItemProps) => {
  const match = useRouteMatch({
    path: item.to,
    exact: item.activeOnlyWhenExact ?? false,
  })
  return (
    <Link
      to={item.to}
      className={`${
        match
          ? 'bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      } flex-shrink-0 group flex items-center justify-center lg:justify-start rounded-lg text-base lg:text-sm font-medium px-2 py-2`}
    >
      <span className="sr-only">{item.description}</span>
      <div className={`${match ? 'text-primary-400 dark:text-secondary-200' : ''} h-6 w-6`}>
        <Icon type={item.icon} />
      </div>
      <div className="hidden lg:block lg:ml-3">{item.text}</div>
    </Link>
  )
}
