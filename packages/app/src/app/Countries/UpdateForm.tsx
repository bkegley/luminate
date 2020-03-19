import React from 'react'
import {Card, Input, Heading, Button} from '@luminate/gatsby-theme-luminate/src'
import {Modal, useDialogState, DialogDisclosure} from '@luminate/gatsby-theme-luminate/src'
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

  const deleteDialog = useDialogState()

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
            <Modal dialog={deleteDialog} className="bg-white p-3 rounded-md" top="100px" aria-label="Alert">
              <div className="w-screen-11/12 md:w-screen-3/4 lg:w-screen-1/2">
                <Alert
                  heading="Are you sure?"
                  text="This action cannot be undone."
                  onCancelClick={deleteDialog.toggle}
                  onConfirmClick={() => deleteCountry({variables: {id: country.id}})}
                  variant="danger"
                />
              </div>
            </Modal>
            <Card className="p-3 overflow-visible" variant={isModal ? 'blank' : 'default'}>
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('name') ? (
                <div>
                  <label className="block mb-2" htmlFor="name">
                    Name
                  </label>
                  <Field name="name" id="name" as={Input} />
                </div>
              ) : null}
            </Card>
            <div className="flex justify-end mt-4 px-3">
              <div className="order-1">
                <Button type="submit">Submit</Button>
              </div>
              <div className="mr-2">
                <DialogDisclosure {...deleteDialog} as={Button} variant="text">
                  Delete
                </DialogDisclosure>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CountryUpdateForm
