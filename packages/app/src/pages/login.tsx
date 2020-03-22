import React from 'react'
import {Card, Heading} from '@luminate/gatsby-theme-luminate/src'
import Layout from '../components/Layout'
import Header from '../components/RootHeader'
import LoginForm from '../components/LoginForm'
import {Link} from 'gatsby'

const LoginPage = () => {
  return (
    <Layout header={<Header />}>
      <div className="pt-20 px-4 mb-6">
        <Card className="mx-auto mt-5 overflow-hidden" style={{maxWidth: '900px'}}>
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col justify-between w-5/12 px-4 py-5 bg-primary-600 text-white">
              <p className="text-center">
                Coffee is better shared. Luminate makes it easy to share the world's greatest coffees so that the world
                can make greater coffee.
              </p>
              <div className="text-center">
                <p>Don't have an account?</p>
                <Link to="/register">Get started!</Link>
              </div>
            </div>
            <div className="w-7/12 px-4 py-5">
              <Heading className="mb-3">Account Login</Heading>
              <LoginForm />
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default LoginPage
