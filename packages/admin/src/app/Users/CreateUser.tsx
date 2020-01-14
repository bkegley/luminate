/** @jsx jsx */

import {jsx} from 'theme-ui'
import {Formik, Form, Field} from 'formik'
import {useCreateUserMutation} from '../../graphql'
import {useHistory} from 'react-router-dom'

const CreateUser = () => {
  const [createUser] = useCreateUserMutation()
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        firstName: '',
        lastName: '',
      }}
      onSubmit={values => {
        createUser({variables: {input: values}}).then(res => {
          if (!res.errors) {
            if (res.data && res.data.createUser) {
              // update cache here
              history.push(`/app/users/${res.data.createUser?.id}`)
            }
          }
        })
      }}
    >
      {() => {
        return (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field id="username" name="username" type="text" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" type="text" />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CreateUser
