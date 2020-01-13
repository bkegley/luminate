import React from 'react'
import {useUser, useLogout} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'

const IndexPage = () => {
  const {data} = useUser()
  const [logout, {error, loading}] = useLogout()

  if (!data) {
    navigate('/login')
    return null
  }
  return (
    <div>
      <h1 sx={{color: 'text'}}>IndexPage</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default IndexPage
