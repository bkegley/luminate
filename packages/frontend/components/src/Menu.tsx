import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

export const HeaderMenu = () => {
  return (
    <div className="relative ml-3">
      <Menu>
        {({ open }) => {
          return (
            <>
              <div>
                <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:bg-cool-gray-100 lg:p-2 lg:rounded-md lg:hover:bg-cool-gray-100">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://picsum.photos/200"
                    alt=""
                  />
                  <svg
                    className="flex-shrink-0 hidden w-5 h-5 ml-1 text-cool-gray-400 lg:block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
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
                  <div className="absolute right-0 w-48 mt-2 shadow-lg origin-top-right rounded-md">
                    <div className="py-1 bg-white rounded-md shadow-xs">
                      <Menu.Item>
                        {({ active }) => {
                          return (
                            <Link
                              to="/profile"
                              href="#"
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700'
                              } block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150 w-full`}
                            >
                              Your Profile
                            </Link>
                          );
                        }}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => {
                          return (
                            <button
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700'
                              } block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150 text-left w-full`}
                            >
                              Logout
                            </button>
                          );
                        }}
                      </Menu.Item>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          );
        }}
      </Menu>
    </div>
  );
};
