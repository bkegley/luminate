import React from 'react'
import {useUser} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {BrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Header from '../components/AppHeader'
import App from '../app'

const AppPage = () => {
  const {user} = useUser()

  if (!user) {
    if (typeof window !== 'undefined') {
      navigate('/login')
    }
    return null
  }

  return (
    <BrowserRouter>
      <Layout header={<Header />} sidebar={<Sidebar />}>
        <div className="pt-24 px-4 mb-6">
          <App />
        </div>
      </Layout>
    </BrowserRouter>
  )
}

export default AppPage
