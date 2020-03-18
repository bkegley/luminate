/** @jsx jsx */
import {jsx, Flex, Box, Card, Field as ThemeField, Heading, Button} from 'theme-ui'
import React from 'react'
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

interface VarietyUpdateFormProps {
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

const VarietyUpdateForm = ({
  variety,
  title,
  isModal,
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: VarietyUpdateFormProps) => {
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
              <Box
                sx={{
                  width: ['90vw', '75vw', '50vw'],
                  maxWidth: '600px',
                }}
              >
                <Alert
                  heading="Are you sure?"
                  text="This action cannot be undone."
                  onCancelClick={deleteDialog.toggle}
                  onConfirmClick={() => deleteVariety({variables: {id: variety.id}})}
                  variant="danger"
                />
              </Box>
            </Modal>
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
                <DialogDisclosure {...deleteDialog} as={Button} variant="text">
                  Delete
                </DialogDisclosure>
              </Box>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default VarietyUpdateForm
