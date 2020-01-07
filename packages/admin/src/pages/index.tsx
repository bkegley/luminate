import React from 'react'
import {useListUsersQuery} from '../graphql'
import {UserProvider, useUser} from '../../../gatsby-theme-luminate/src'

const IndexPage = () => {
  const {error, loading, data} = useListUsersQuery()
  if (error || loading) return null
  return (
    <UserProvider>
      <div>
        <User />
        <h1>IndexPage</h1>
        {data?.listUsers.edges.map(edge => {
          return (
            <div>
              <h3>{edge.node?.username}</h3>
              <p>{edge.node?.id}</p>
            </div>
          )
        })}
      </div>
    </UserProvider>
  )
}

function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {login, data} = useUser()
  console.log({data})
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={e => setUsername(e.currentTarget.value)} />
      </div>
      <div>
        <label>Password</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
      </div>
      <button onClick={() => login({username, password})}>Login</button>
    </div>
  )
}

function User() {
  const {data, logout} = useUser()

  if (!data) {
    return <Login />
  }
  return (
    <div>
      <h1>Welcome {data.firstName}</h1>
      <button onClick={logout}>Logout</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default IndexPage
