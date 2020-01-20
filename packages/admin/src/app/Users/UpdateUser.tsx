/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import {Formik, Form, Field} from 'formik'
import {useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation} from '../../graphql'
import {RouteChildrenProps, useHistory} from 'react-router-dom'
import {Button, Box, Card, Flex, Field as ThemeField, Heading} from '@luminate/gatsby-theme-luminate/src/components'

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
    <Box>
      <Box sx={{my: 4}}>
        <Heading as="h1">{data?.getUser?.username}</Heading>
      </Box>
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
                <Box sx={{my: 2}}>
                  <Field name="firstName" type="text" label="First Name" as={ThemeField} />
                </Box>
                <Box sx={{my: 2}}>
                  <Field name="lastName" type="text" label="Last Name" as={ThemeField} />
                </Box>
                <Flex sx={{justifyContent: 'flex-end', my: 2}}>
                  <Box sx={{order: 1}}>
                    <Button type="submit">Submit</Button>
                  </Box>
                  <Box>
                    <Button type="button" variant="danger" onClick={handleDeleteClick}>
                      Delete
                    </Button>
                  </Box>
                </Flex>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </Box>
  )
}

export default UpdateUser
