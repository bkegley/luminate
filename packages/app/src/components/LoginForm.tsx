import React from 'react'
import {navigate} from 'gatsby'
import {useLogin, useLogout, Input} from '@luminate/gatsby-theme-luminate/src'
import {Formik, Form, Field} from 'formik'

const LoginForm = () => {
  const [login, {data, loading, error}] = useLogin()
  const [logout, {loading: logoutLoading, error: logoutError}] = useLogout()

  if (data) {
    navigate('/app')
    return null
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

export default LoginForm
