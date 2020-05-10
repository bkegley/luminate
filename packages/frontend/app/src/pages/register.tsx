import React from 'react'
import RegisterForm from '../components/RegisterForm'
import {Heading} from '@luminate/gatsby-theme-luminate/src'
import Layout from '../components/Layout'
import Header from '../components/RootHeader'

const RegisterPage = () => {
  return (
    <div>
      <div className="pt-20 px-4 mb-6">
        <Heading as="h2">Register</Heading>
      </div>
      <div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
