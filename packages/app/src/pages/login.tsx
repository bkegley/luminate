/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import {useLoginMutation} from '../graphql'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Card, Heading, Button, Field as ThemeField} from '@luminate/gatsby-theme-luminate/src/components'

const LoginPage = () => {
  const [login, {error, loading, data}] = useLoginMutation()

  return (
    <Box>
      <Box>
        <Heading as="h1">Login</Heading>
      </Box>
      <Card>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={values => {
            console.log(values)
          }}
        >
          {() => {
            return (
              <Form>
                <Box sx={{color: ['aaron.least', 'aaron.favorite']}}>
                  <Field name="username" type="text" label="Username" as={ThemeField} />
                </Box>
                <Box>
                  <Field name="password" type="password" label="Password" as={ThemeField} />
                </Box>
                <Flex>
                  <Box>
                    <Button type="submit">Login</Button>
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
export default LoginPage
