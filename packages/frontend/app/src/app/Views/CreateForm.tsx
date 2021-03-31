import React from 'react'
import {Card, Button, Input} from '@luminate/components'
import {Formik, Form, Field} from 'formik'
import {useCreateViewMutation, CreateViewMutation, ListViewsDocument, CreateViewInput} from '../../graphql'
import {useHistory} from 'react-router-dom'

interface ViewCreateFormProps {
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof CreateViewInput>
  initialValues?: Partial<CreateViewInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateViewMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const ViewCreateForm = ({fields, initialValues, onCreateSuccess, onCreateError, onCancel}: ViewCreateFormProps) => {
  const history = useHistory()
  const [createView, {data, error, loading}] = useCreateViewMutation({
    refetchQueries: [{query: ListViewsDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`/views/${data.createView?.id}`)
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
        description: '',
        ...initialValues,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createView({
          variables: {
            input: values,
          },
        })
        setSubmitting(false)
      }}
    >
      {({dirty}) => {
        return (
          <Form>
            <Card>
              <div className="p-6">
                {!fields || fields.includes('name') ? (
                  <div className="mb-3">
                    <label className="block mb-1">Name</label>
                    <Field name="name" id="name" as={Input} />
                  </div>
                ) : null}
                {!fields || fields.includes('description') ? (
                  <div className="mb-3">
                    <label className="block mb-1">Description</label>
                    <Field name="description" id="description" as={Input} />
                  </div>
                ) : null}
              </div>
              <Card.Footer>
                <div className="flex justify-end mt-4 px-3">
                  <div className="order-1">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </div>
                  {onCancel ? (
                    <div className="mr-3">
                      <Button type="button" variant="outline" onClick={() => onCancel(dirty)}>
                        Cancel
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Card.Footer>
            </Card>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ViewCreateForm
