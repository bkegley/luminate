/** @jsx jsx */
import {jsx, Flex, Box, Button, Label, Input} from 'theme-ui'
import {navigate} from 'gatsby'
import {useLogin} from '@luminate/gatsby-theme-luminate/src'
import {Formik, Form, Field} from 'formik'

const LoginForm = () => {
  const [login, {data, loading, error}] = useLogin()

  if (data) {
    navigate('/app')
    return null
  }

  return (
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
            <Flex sx={{flexDirection: 'column'}}>
              <Box sx={{my: 2}}>
                <Label htmlFor="loginUsername">Username</Label>
                <Field name="username" id="loginUsername" type="text" as={Input} />
              </Box>
              <Box sx={{my: 2}}>
                <Label htmlFor="loginPassword">Password</Label>
                <Field name="password" id="loginPassword" type="password" as={Input} />
              </Box>
              <Box sx={{mt: 3}}>
                <Button type="submit" sx={{width: '100%'}}>
                  Login
                </Button>
              </Box>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
