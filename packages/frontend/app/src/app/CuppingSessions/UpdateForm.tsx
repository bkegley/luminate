import React from 'react'
import {
  Modal,
  useDialogState,
  DialogDisclosure,
  Card,
  Input,
  Heading,
  Button,
} from '@luminate/gatsby-theme-luminate/src'
import Alert from '../../components/Alert'
import {
  useUpdateCuppingSessionMutation,
  useDeleteCuppingSessionMutation,
  ListCuppingSessionsDocument,
  CuppingSession,
  UpdateCuppingSessionMutation,
  DeleteCuppingSessionMutation,
  UpdateCuppingSessionInput,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface CuppingSessionUpdateFormProps {
  cuppingSession: CuppingSession
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof UpdateCuppingSessionInput>
  /* Add functionality when entity successfully updates */
  onUpdateSuccess?: (data: UpdateCuppingSessionMutation) => void
  /* Add functionality when entity fails to update */
  onUpdateError?: (err: any) => void
  /* Add functionality when entity is successfully deleted - default is to redirect to list view */
  onDeleteSuccess?: (data: DeleteCuppingSessionMutation) => void
  /* Add functionality when entity fails to */
  onDeleteError?: (err: any) => void
}

const CuppingSessionUpdateForm = ({
  cuppingSession,
  title,
  isModal,
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: CuppingSessionUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [
    updateCuppingSession,
    {data: updateData, error: updateError, loading: updateLoading},
  ] = useUpdateCuppingSessionMutation({
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
  const [
    deleteCuppingSession,
    {data: deleteData, error: deleteError, loading: deleteLoading},
  ] = useDeleteCuppingSessionMutation({
    variables: {id: cuppingSession.id},
    refetchQueries: [{query: ListCuppingSessionsDocument}],
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
        description: cuppingSession.description,
        internalId: cuppingSession.internalId,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateCuppingSession({
          variables: {
            id: cuppingSession.id,
            input: values,
          },
        })
        setSubmitting(false)
      }}
    >
      {() => {
        return (
          <Form>
            <Modal
              className="bg-white p-3 rounded-md w-screen-5/6 md:w-screen-3/4 lg:w-screen-1/3"
              top="100px"
              dialog={deleteDialog}
              aria-label="Alert"
            >
              <Alert
                heading="Are you sure?"
                text="This action cannot be undone."
                onCancelClick={deleteDialog.toggle}
                onConfirmClick={() => deleteCuppingSession({variables: {id: cuppingSession.id}})}
                variant="danger"
              />
            </Modal>
            <Card className="p-3 overflow-visible" variant={isModal ? 'blank' : 'default'}>
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('description') ? (
                <div className="mb-3">
                  <label className="block mb-1" htmlFor="description">
                    Description
                  </label>
                  <Field name="description" id="description" as={Input} />
                </div>
              ) : null}
              {!fields || fields.includes('internalId') ? (
                <div className="mb-3">
                  <label className="block mb-1" htmlFor="internalId">
                    Internal Id
                  </label>
                  <Field name="internalId" id="internalId" as={Input} />
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

export default CuppingSessionUpdateForm
