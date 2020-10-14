import React from 'react'
import {navigate} from 'gatsby'
import {useLogin, useLogout} from '@luminate/gatsby-theme-luminate/src'
import {Formik, Form, Field} from 'formik'

const LoginPage = () => {
  const [login, {data, loading, error}] = useLogin()
  const [logout, {loading: logoutLoading, error: logoutError}] = useLogout()

  if (data) {
    if (data.roles?.find(role => role && role.name === 'Admin')) {
      navigate('/app')
      return null
    }
    return (
      <div>
        <p>It looks like you don't have admin privileges.</p>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={values => {
          login(values)
        }}
      >
        {() => {
          return (
            <Form>
              <div>
                <label htmlFor="username">Username</label>
                <Field name="username" id="username" type="text" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="password" />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginPage
