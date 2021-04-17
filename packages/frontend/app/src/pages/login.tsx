import React from 'react'
import {useDarkMode} from '../hooks/useDarkMode'
import {useUser} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {Label, Input, Card, Heading} from '@luminate/components'

const LoginPage = () => {
  const {login, user} = useUser()
  const {darkMode} = useDarkMode()

  if (user) {
    if (typeof window !== 'undefined') {
      navigate('/')
    }
    return null
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:text-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Heading as="h1">
              <span className="bg-gradient-to-l gradient-heading">luminate</span>
            </Heading>
          </div>
          <div className="mt-6 text-center">
            <Heading as="h3">Sign in to your account</Heading>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <div className="py-8 px-4 sm:px-10">
              <form
                className="space-y-6"
                onSubmit={e => {
                  e.preventDefault()
                  const target = e.target as EventTarget & {
                    username: {value: string}
                    password: {value: string}
                  }
                  login({
                    variables: {
                      username: target.username.value,
                      password: target.password.value,
                    },
                  })
                }}
                method="POST"
              >
                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="mt-1">
                    <Input id="username" name="username" autoComplete="username" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1">
                    <Input id="password" name="password" type="password" autoComplete="current-password" required />
                  </div>
                </div>

                <div className="flex items-center justify-end">
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
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
