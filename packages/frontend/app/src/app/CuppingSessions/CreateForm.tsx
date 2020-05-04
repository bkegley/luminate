import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Combobox, Heading, Card, Button, Input, Modal, useDialogState} from '@luminate/gatsby-theme-luminate/src'
import {
  useCreateCuppingSessionMutation,
  OperatorEnum,
  CreateCuppingSessionMutation,
  ListCuppingSessionsDocument,
  CreateCuppingSessionInput,
} from '../../graphql'
import {useHistory} from 'react-router-dom'
import CreateCountryForm from '../Countries/CreateForm'
import CreateRegionForm from '../Regions/CreateForm'

interface CuppingSessionCreateFormProps {
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof CreateCuppingSessionInput>
  initialValues?: Partial<CreateCuppingSessionInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateCuppingSessionMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const CuppingSessionCreateForm = ({
  title,
  isModal,
  fields,
  initialValues,
  onCreateSuccess,
  onCreateError,
  onCancel,
}: CuppingSessionCreateFormProps) => {
  const history = useHistory()
  const [createCuppingSession, {data, error, loading}] = useCreateCuppingSessionMutation({
    refetchQueries: [{query: ListCuppingSessionsDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`/cupping-sessions/${data.createCuppingSession?.id}`)
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
        description: '',
        internalId: '',
        ...initialValues,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createCuppingSession({
          variables: {
            input: values,
          },
        })
        setSubmitting(false)
      }}
      enableReinitialize
    >
      {({dirty}) => {
        return (
          <Form>
            <Card variant={isModal ? 'blank' : 'default'} className="p-3 overflow-visible">
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('description') ? (
                <div className="mb-3">
                  <label className="block mb-2" htmlFor="description">
                    Description
                  </label>
                  <Field name="description" id="description" as={Input} />
                </div>
              ) : null}
              {!fields || fields.includes('internalId') ? (
                <div className="mb-3">
                  <label className="block mb-2" htmlFor="internalId">
                    Internal Id
                  </label>
                  <Field name="internalId" id="internalId" as={Input} />
                </div>
              ) : null}
            </Card>
            <div className="flex justify-end mt-4 px-3">
              <div className="order-1">
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </div>
              {onCancel ? (
                <div className="mr-3">
                  <Button type="button" variant="text" onClick={() => onCancel(dirty)}>
                    Cancel
                  </Button>
                </div>
              ) : null}
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CuppingSessionCreateForm
