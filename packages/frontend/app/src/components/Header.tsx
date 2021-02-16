import React from 'react'
import {Menu, Transition} from '@headlessui/react'
import {IconTypesEnum, Icon} from '@luminate/components'

const SearchInput = () => {
  return (
    <div className="flex-1 flex justify-center lg:justify-end">
      <div className="w-full px-2 lg:px-6">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative text-gray-600 dark:text-gray-400 focus-within:text-gray-900 dark:focus-within:text-gray-200">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="h-5 w-5">
              <Icon type={IconTypesEnum.SEARCH} />
            </span>
          </div>
          <input
            id="search"
            name="search"
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-400 bg-opacity-25 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-0 focus:border-secondary-300 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
    </div>
  )
}

export interface HeaderProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({open, setOpen}: HeaderProps) => {
  return (
    <nav className="flex-shrink-0 bg-gray-50 dark:bg-gray-800">
      <div className="px-2 sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex md:hidden">
            <button
              className="bg-gray-300 dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-secondary-300 dark:text-secondary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-500 focus:ring-white"
              aria-expanded="false"
              onClick={() => setOpen(open => !open)}
            >
              <span className="sr-only">Open main menu</span>
              <span className="h-6 w-6">
                <Icon type={open ? IconTypesEnum.CHEVRON_DOUBLE_LEFT : IconTypesEnum.CHEVRON_DOUBLE_RIGHT} />
              </span>
            </button>
          </div>
          <div className="flex flex-1 justify-center md:flex-none md:justify-start items-center px-2 lg:px-0 xl:w-64">
            <div className="flex-shrink-0">
              <span>luminate</span>
            </div>
          </div>

          <SearchInput />

          <div className="hidden md:block md:w-80">
            <div className="flex items-center justify-end">
              <div className="flex">
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-secondary-500 dark:hover:text-secondary-300"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-secondary-500 dark:hover:text-secondary-300"
                >
                  Support
                </a>
              </div>
              <div className="relative ml-3">
                <Menu>
                  {({open}) => {
                    return (
                      <>
                        <div>
                          <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:bg-cool-gray-100 lg:p-2 lg:rounded-md lg:hover:bg-cool-gray-100">
                            <img className="w-8 h-8 rounded-full" src="https://picsum.photos/200" alt="" />
                            <span className="flex-shrink-0 hidden w-5 h-5 ml-1 text-cool-gray-400 md:block">
                              <Icon type={IconTypesEnum.CHEVRON_DOWN} />
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items>
                            <div
                              className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu"
                            >
                              <Menu.Item>
                                {() => {
                                  return (
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                    >
                                      View Profile
                                    </a>
                                  )
                                }}
                              </Menu.Item>
                              <Menu.Item>
                                {() => {
                                  return (
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                    >
                                      Settings
                                    </a>
                                  )
                                }}
                              </Menu.Item>
                              <Menu.Item>
                                {() => {
                                  return (
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                    >
                                      Logout
                                    </a>
                                  )
                                }}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )
                  }}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
