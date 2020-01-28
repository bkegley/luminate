/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Flex, Box, Field as ThemeField, Heading, Button, Select, Combobox} from '@luminate/gatsby-theme-luminate/src'

import {useUpdateCountryMutation, Country} from '../../graphql'
import {Formik, Form, Field} from 'formik'

interface Props {
  country: Country
}

const CountryUpdateForm = ({country}: Props) => {
  const [updateCountry, {data, error, loading}] = useUpdateCountryMutation()
  return (
    <Formik
      initialValues={{
        name: country.name || '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        updateCountry({variables: {id: country.id, input: values}})
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
                <Heading>{country.id}</Heading>
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

export default CountryUpdateForm
