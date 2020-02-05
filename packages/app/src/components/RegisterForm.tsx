import React from 'react'
import {useCreateAccountMutation} from '../graphql'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Field as ThemeField, Heading, Button, Card} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'
import {useThemeUI} from 'theme-ui'

interface RegisterFormProps {
  isModal?: boolean
}

const RegisterForm = ({isModal}: RegisterFormProps) => {
  const [createAccount] = useCreateAccountMutation()
  const theme = useThemeUI()
  console.log({theme})
  return (
    <div>
      <Box sx={{mb: 4}}>
        <Heading as="h1">Register</Heading>
      </Box>
      <Formik
        initialValues={{
          name: '',
          username: '',
          password: '',
        }}
        onSubmit={(values, {setSubmitting}) => {
          createAccount({variables: {input: values}})
            .then(res => {
              console.log(res)
              setSubmitting(false)
              navigate('/login')
            })
            .catch(err => {
              console.log({err})
            })
        }}
      >
        <Form>
          <Card variant={isModal ? 'blank' : 'primary'} sx={{p: 3}}>
            <div>
              <Field name="name" type="text" label="Account Name" as={ThemeField} />
            </div>
            <div>
              <Field name="username" type="text" label="Username" as={ThemeField} />
            </div>
            <div>
              <Field name="password" type="password" label="Password" as={ThemeField} />
            </div>
          </Card>
          <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
            <Box>
              <Button type="submit">Submit</Button>
            </Box>
          </Flex>
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterForm
