import React from 'react'
import {navigate} from 'gatsby'
import {useUser, Button, Input} from '@luminate/gatsby-theme-luminate/src'
import {Formik, Form, Field} from 'formik'

const LoginForm = () => {
  const {user, login} = useUser()

  if (user) {
    if (typeof window !== 'undefined') {
      navigate('/')
    }
    return null
  }
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={values => {
        login({variables: values})
      }}
    >
      {() => {
        return (
          <Form>
            <div className="flex flex-col">
              <div className="my-2">
                <label className="block my-1" htmlFor="loginUsername">
                  Username
                </label>
                <Field name="username" id="loginUsername" type="text" as={Input} />
              </div>
              <div className="my-2">
                <label className="block my-1" htmlFor="loginPassword">
                  Password
                </label>
                <Field name="password" id="loginPassword" type="password" as={Input} />
              </div>
              <div className="mt-3">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
