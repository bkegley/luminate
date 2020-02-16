/** @jsx jsx */
import {jsx, Flex, Box, Card, Field as ThemeField, Heading, Button} from 'theme-ui'
import React from 'react'
import {Modal} from '@luminate/gatsby-theme-luminate/src'
import Alert from '../../components/Alert'
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
                <Modal
                  backdrop={true}
                  disclosure={
                    <Button type="button" variant="buttons.text">
                      Delete
                    </Button>
                  }
                >
                  {dialog => {
                    return (
                      <Box
                        sx={{
                          width: ['90vw', '75vw', '50vw'],
                          maxWidth: '600px',
                        }}
                      >
                        <Alert
                          heading="Are you sure?"
                          text="This action cannot be undone."
                          onCancelClick={dialog.toggle}
                          onConfirmClick={() => deleteCountry({variables: {id: country.id}})}
                          variant="danger"
                        />
                      </Box>
                    )
                  }}
                </Modal>
              </Box>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CountryUpdateForm
