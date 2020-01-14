/** @jsx jsx */
import {jsx} from 'theme-ui'
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
              <div>
                <Field name="firstName" type="text" />
              </div>
              <div>
                <Field name="lastName" type="text" />
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

export default UpdateUser
