/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Heading, Button, Field as ThemeField} from '@luminate/gatsby-theme-luminate/src'
import {useCreateCountryMutation, CreateCountryInput, CreateCountryMutation, ListCountriesDocument} from '../../graphql'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface CountryCreateFormProps {
  fields?: Array<keyof CreateCountryInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateCountryMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
}

const CountryCreateForm = ({fields, onCreateSuccess, onCreateError}: CountryCreateFormProps) => {
  const history = useHistory()
  const {url} = useRouteMatch()
  const [createCountry, {data, error, loading}] = useCreateCountryMutation({
    refetchQueries: [{query: ListCountriesDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`${url}/${data.createCountry?.id}`)
      }
    },
    onError: err => {
      if (onCreateError) {
        onCreateError(err)
      }
    },
  })

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createCountry({
          variables: {
            input: values,
          },
        })
        setSubmitting(false)
      }}
    >
      {() => {
        return (
          <Form>
            <Flex sx={{flexDirection: 'column'}}>
              <Box>
                <Heading>Create a Country</Heading>
              </Box>
              {!fields || fields.includes('name') ? (
                <Box>
                  <Field name="name" label="Name" as={ThemeField} />
                </Box>
              ) : null}
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
