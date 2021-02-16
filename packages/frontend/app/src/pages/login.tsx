import React from 'react'
import {Card, Heading} from '@luminate/gatsby-theme-luminate/src'
import Layout from '../components/Layout'
import Header from '../components/RootHeader'
import LoginForm from '../components/LoginForm'
import {Link} from 'gatsby'
import {useDarkMode} from '../hooks/useDarkMode'

const LoginPage = () => {
  const {darkMode, toggleDarkMode} = useDarkMode()
  console.log({darkMode})
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-900 bg-primary-600 dark:bg-primary-200 hover:bg-primary-700 dark:hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-100"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Dark' : 'Light'}
        </button>
        <div className="grid grid-cols-10">
          <div className="col-span-1 h-10 bg-primary-50" />
          <div className="col-span-1 h-10 bg-primary-100" />
          <div className="col-span-1 h-10 bg-primary-200" />
          <div className="col-span-1 h-10 bg-primary-300" />
          <div className="col-span-1 h-10 bg-primary-400" />
          <div className="col-span-1 h-10 bg-primary-500" />
          <div className="col-span-1 h-10 bg-primary-600" />
          <div className="col-span-1 h-10 bg-primary-700" />
          <div className="col-span-1 h-10 bg-primary-800" />
          <div className="col-span-1 h-10 bg-primary-900" />
        </div>
        <div className="grid grid-cols-10">
          <div className="col-span-1 h-10 bg-secondary-50" />
          <div className="col-span-1 h-10 bg-secondary-100" />
          <div className="col-span-1 h-10 bg-secondary-200" />
          <div className="col-span-1 h-10 bg-secondary-300" />
          <div className="col-span-1 h-10 bg-secondary-400" />
          <div className="col-span-1 h-10 bg-secondary-500" />
          <div className="col-span-1 h-10 bg-secondary-600" />
          <div className="col-span-1 h-10 bg-secondary-700" />
          <div className="col-span-1 h-10 bg-secondary-800" />
          <div className="col-span-1 h-10 bg-secondary-900" />
        </div>
        <div className="grid grid-cols-10">
          <div className="col-span-1 h-10 bg-gray-50" />
          <div className="col-span-1 h-10 bg-gray-100" />
          <div className="col-span-1 h-10 bg-gray-200" />
          <div className="col-span-1 h-10 bg-gray-300" />
          <div className="col-span-1 h-10 bg-gray-400" />
          <div className="col-span-1 h-10 bg-gray-500" />
          <div className="col-span-1 h-10 bg-gray-600" />
          <div className="col-span-1 h-10 bg-gray-700" />
          <div className="col-span-1 h-10 bg-gray-800" />
          <div className="col-span-1 h-10 bg-gray-900" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              start your 14-day free trial
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
