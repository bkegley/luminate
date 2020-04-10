import React from 'react'
import {Formik, Form, Field} from 'formik'
import {useCreateRoleMutation} from '../../graphql'
import {useHistory} from 'react-router-dom'

const CreateRole = () => {
  const [createRole] = useCreateRoleMutation()
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={values => {
        createRole({variables: {input: values}}).then(res => {
          if (!res.errors) {
            if (res.data && res.data.createRole) {
              // update cache here
              history.push(`/app/roles/${res.data.createRole?.id}`)
            }
          }
        })
      }}
    >
      {() => {
        return (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" type="text" />
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

export default CreateRole
