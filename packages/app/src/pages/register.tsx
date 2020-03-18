import React from 'react'
import RegisterForm from '../components/RegisterForm'
import {Layout, Heading} from '@luminate/gatsby-theme-luminate/src'
import Header from '../components/RootHeader'

const RegisterPage = () => {
  return (
    <Layout header={<Header />}>
      <div className="pt-20 px-4 mb-6">
        <Heading as="h2">Register</Heading>
      </div>
      <div>
        <RegisterForm />
      </div>
    </Layout>
  )
}

export default RegisterPage
