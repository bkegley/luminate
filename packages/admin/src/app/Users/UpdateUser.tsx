import React from 'react'
import {Button, Card, Heading, Input} from '@luminate/gatsby-theme-luminate/src'
import {Formik, Form, Field} from 'formik'
import {useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation} from '../../graphql'
import {RouteChildrenProps, useHistory} from 'react-router-dom'

interface Params {
  id: string
}

interface Props extends RouteChildrenProps<Params> {}

const UpdateUser = ({match}: Props) => {
  const id = match?.params.id as string

  const {error, loading, data} = useGetUserQuery({variables: {id}})
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser, {client}] = useDeleteUserMutation()
  const history = useHistory()

  const handleDeleteClick = () => {
    deleteUser({variables: {id}}).then(res => {
      // update cache here as well
      history.push('/app/users')
    })
  }

  if (error || loading) return null

  return (
    <div>
      <div className="my-4">
        <Heading>{data?.getUser?.username}</Heading>
      </div>
      <Card>
        <Formik
          initialValues={{
            firstName: data?.getUser?.firstName,
            lastName: data?.getUser?.lastName,
          }}
          onSubmit={values => {
            updateUser({
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
                <div className="my-2">
                  <label htmlFor="firstName" className="block my-1">
                    First Name
                  </label>
                  <Field name="firstName" type="text" id="firstName" as={Input} />
                </div>
                <div className="my-2">
                  <label htmlFor="lastName" className="block my-1">
                    Last Name
                  </label>
                  <Field name="lastName" type="text" id="lastName" as={Input} />
                </div>
                <div className="flex justify-end my-2">
                  <div className="order-1">
                    <Button type="submit">Submit</Button>
                  </div>
                  <div>
                    <Button type="button" variant="danger" onClick={handleDeleteClick}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </div>
  )
}

export default UpdateUser
