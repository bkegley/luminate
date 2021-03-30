import React from 'react'
import {Card, Button, Input} from '@luminate/components'
import {Modal, useDialogState, DialogDisclosure} from '@luminate/gatsby-theme-luminate/src'
import Alert from '../../components/Alert'
import {
  useUpdateVarietyMutation,
  useDeleteVarietyMutation,
  ListVarietiesDocument,
  Variety,
  UpdateVarietyMutation,
  DeleteVarietyMutation,
  UpdateVarietyInput,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface ViewUpdateFormProps {
  variety: Variety
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof UpdateVarietyInput>
  /* Add functionality when entity successfully updates */
  onUpdateSuccess?: (data: UpdateVarietyMutation) => void
  /* Add functionality when entity fails to update */
  onUpdateError?: (err: any) => void
  /* Add functionality when entity is successfully deleted - default is to redirect to list view */
  onDeleteSuccess?: (data: DeleteVarietyMutation) => void
  /* Add functionality when entity fails to */
  onDeleteError?: (err: any) => void
}

const ViewUpdateForm = ({
  variety,
  title,
  isModal,
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: ViewUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [updateVariety, {data: updateData, error: updateError, loading: updateLoading}] = useUpdateVarietyMutation({
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
  const [deleteVariety, {data: deleteData, error: deleteError, loading: deleteLoading}] = useDeleteVarietyMutation({
    variables: {id: variety.id},
    refetchQueries: [{query: ListVarietiesDocument}],
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
        name: variety.name || '',
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateVariety({
          variables: {
            id: variety.id,
            input: values,
          },
        })
        setSubmitting(false)
      }}
    >
      {({}) => {
        return (
          <Form>
            <Modal dialog={deleteDialog} className="bg-white p-3 rounded-md" top="100px" aria-label="Alert">
              <div className="w-screen-11/12 md:w-screen-3/4 lg:w-screen-1/2">
                <Alert
                  heading="Are you sure?"
                  text="This action cannot be undone."
                  onCancelClick={deleteDialog.toggle}
                  onConfirmClick={() => deleteVariety({variables: {id: variety.id}})}
                  variant="danger"
                />
              </div>
            </Modal>
            <Card>
              <div className="p-6">
                {!fields || fields.includes('name') ? (
                  <div className="mb-3">
                    <label className="block mb-1" htmlFor="name">
                      Name
                    </label>
                    <Field name="name" id="name" as={Input} />
                  </div>
                ) : null}
              </div>
              <Card.Footer>
                <div className="flex justify-end mt-4 px-3">
                  <div className="order-1">
                    <Button type="submit">Submit</Button>
                  </div>
                  <div className="mr-2">
                    <DialogDisclosure {...deleteDialog} as={Button} variant="outline">
                      Delete
                    </DialogDisclosure>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ViewUpdateForm
