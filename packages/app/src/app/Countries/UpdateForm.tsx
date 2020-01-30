/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {Flex, Box, Field as ThemeField, Heading, Button, Select, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  ListCountriesDocument,
  Country,
  UpdateCountryInput,
  UpdateCountryMutation,
  DeleteCountryMutation,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface CountryUpdateFormProps {
  country: Country
  fields?: Array<keyof UpdateCountryInput>
  /* Add functionality when entity successfully updates */
  onUpdateSuccess?: (data: UpdateCountryMutation) => void
  /* Add functionality when entity fails to update */
  onUpdateError?: (err: any) => void
  /* Add functionality when entity is successfully deleted - default is to redirect to list view */
  onDeleteSuccess?: (data: DeleteCountryMutation) => void
  /* Add functionality when entity fails to */
  onDeleteError?: (err: any) => void
}

const CountryUpdateForm = ({
  fields,
  country,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: CountryUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [updateCountry, {data: updateData, error: updateError, loading: updateLoading}] = useUpdateCountryMutation({
    onCompleted: data => {
      if (onUpdateSuccess) {
        onUpdateSuccess(data)
      }
    },
    onError: err => {
      if (onUpdateError) {
        onUpdateError(err)
      }
    },
  })
  const [deleteCountry, {data: deleteData, error: deleteError, loading: deleteLoading}] = useDeleteCountryMutation({
    variables: {id: country.id},
    refetchQueries: [{query: ListCountriesDocument}],
    awaitRefetchQueries: true,
    onCompleted: data => {
      if (onDeleteSuccess) {
        onDeleteSuccess(data)
      } else {
        history.push(path.slice(0, path.indexOf('/:id')))
      }
    },
    onError: err => {
      if (onDeleteError) {
        onDeleteError(err)
      }
    },
  })

  return (
    <Formik
      initialValues={{
        name: country.name || '',
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateCountry({variables: {id: country.id, input: values}})
        setSubmitting(false)
      }}
    >
      {() => {
        return (
          <Form>
            <Flex sx={{flexDirection: 'column'}}>
              <Box>
                <Heading>{country.id}</Heading>
              </Box>
              {!fields || fields.includes('name') ? (
                <Box>
                  <Field name="name" label="Name" as={ThemeField} />
                </Box>
              ) : null}
              <Flex sx={{justifyContent: 'flex-end'}}>
                <Box sx={{order: 1}}>
                  <Button type="submit">Submit</Button>
                </Box>
                <Box sx={{mr: 2}}>
                  <Button type="button" variant="buttons.text" onClick={() => deleteCountry()}>
                    Delete
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CountryUpdateForm
