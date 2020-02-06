import React from 'react'
import {useCreateAccountMutation} from '../graphql'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Field as ThemeField, Button, Card} from '@luminate/gatsby-theme-luminate/src'
import {navigate} from 'gatsby'

interface RegisterFormProps {
  isModal?: boolean
}

const RegisterForm = ({isModal}: RegisterFormProps) => {
  const [createAccount] = useCreateAccountMutation()
  return (
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
          <Box sx={{my: 2}}>
            <Field name="name" type="text" label="Account Name" as={ThemeField} />
          </Box>
          <Box sx={{my: 2}}>
            <Field name="username" type="text" label="Username" as={ThemeField} />
          </Box>
          <Box sx={{my: 2}}>
            <Field name="password" type="password" label="Password" as={ThemeField} />
          </Box>
        </Card>
        <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
          <Box>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Box>
        </Flex>
      </Form>
    </Formik>
  )
}

export default RegisterForm
