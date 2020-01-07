import React from 'react'
import {UserContext} from './UserProvider'

const useUser = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be wrapped in a UserProvider')
  }

  return context
}

export default useUser
