/** @jsx jsx */
import {jsx, Flex, Box, Card, Field as ThemeField, Heading, Button} from 'theme-ui'
import React from 'react'
import {
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  ListCountriesDocument,
  Country,
  UpdateCountryMutation,
  DeleteCountryMutation,
  UpdateCountryInput,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface CountryUpdateFormProps {
  country: Country
  title?: React.ReactNode
  isModal?: boolean
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
  country,
  title,
  isModal,
  fields,
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
        await updateCountry({
          variables: {
            id: country.id,
            input: values,
          },
        })
        setSubmitting(false)
      }}
    >
      {() => {
        return (
          <Form>
            <Card variant={isModal ? 'blank' : 'primary'} sx={{p: 3, overflow: 'visible'}}>
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('name') ? (
                <Box>
                  <Field name="name" label="Name" as={ThemeField} />
                </Box>
              ) : null}
            </Card>
            <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
              <Box sx={{order: 1}}>
                <Button type="submit">Submit</Button>
              </Box>
              <Box sx={{mr: 2}}>
                <Button type="button" variant="buttons.text" onClick={() => deleteCountry()}>
                  Delete
                </Button>
              </Box>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CountryUpdateForm
