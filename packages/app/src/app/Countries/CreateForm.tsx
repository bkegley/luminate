/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Heading, Button, Field as ThemeField} from '@luminate/gatsby-theme-luminate/src'
import {useCreateCountryMutation} from '../../graphql'

const CountryCreateForm = () => {
  const [createCountry, {data, error, loading}] = useCreateCountryMutation()

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        createCountry({
          variables: {
            input: values,
          },
        })
          .then(res => {
            console.log({res})
            setSubmitting(false)
          })
          .catch(err => {
            console.log({err})
            setSubmitting(false)
          })
      }}
    >
      {() => {
        return (
          <Form>
            <Flex sx={{flexDirection: 'column'}}>
              <Box>
                <Heading>Create a Country</Heading>
              </Box>
              <Box>
                <Field name="name" label="Name" as={ThemeField} />
              </Box>
              <Box>
                <Button type="submit">Submit</Button>
              </Box>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CountryCreateForm
