import React from 'react'
import {useUser} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {BrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import App from '../app'

const IndexPage = () => {
  const {user} = useUser()

  if (!user) {
    if (typeof window !== 'undefined') {
      navigate('/login')
    }
    return null
  }

  return (
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  )
}

export default IndexPage
