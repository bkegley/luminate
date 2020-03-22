import React from 'react'
import {Formik, Form, Field} from 'formik'
import {useGetRoleQuery, useUpdateRoleMutation, useDeleteRoleMutation} from '../../graphql'
import {RouteChildrenProps, useHistory} from 'react-router-dom'

interface Params {
  id: string
}

interface Props extends RouteChildrenProps<Params> {}

const UpdateRole = ({match}: Props) => {
  const id = match?.params.id as string

  const {error, loading, data} = useGetRoleQuery({variables: {id}})
  const [updateRole] = useUpdateRoleMutation()
  const [deleteRole, {client}] = useDeleteRoleMutation()
  const history = useHistory()

  const handleDeleteClick = () => {
    deleteRole({variables: {id}}).then(res => {
      // update cache here as well
      history.push('/app/roles')
    })
  }

  if (error || loading) return null

  return (
    <div>
      <Formik
        initialValues={{
          name: data?.getRole?.name,
        }}
        onSubmit={values => {
          updateRole({
            variables: {
              id,
              input: values,
            },
          })
        }}
      >
        {() => {
          return (
            <Form>
              <div>
                <Field name="name" type="text" />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )
        }}
      </Formik>
      <div>
        <button type="button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default UpdateRole
