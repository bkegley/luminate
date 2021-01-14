import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Heading, Card, Button, Input, Select} from '@luminate/gatsby-theme-luminate/src'
import {
  useCreateBrewerMutation,
  CreateBrewerMutation,
  ListBrewersDocument,
  CreateBrewerInput,
  BrewerType,
} from '../../graphql'
import {useHistory} from 'react-router-dom'

interface BrewerCreateFormProps {
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof CreateBrewerInput>
  initialValues?: Partial<CreateBrewerInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateBrewerMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const BrewerCreateForm = ({
  title,
  isModal,
  fields,
  initialValues,
  onCreateSuccess,
  onCreateError,
  onCancel,
}: BrewerCreateFormProps) => {
  const history = useHistory()
  const [createBrewer, {data, error, loading}] = useCreateBrewerMutation({
    refetchQueries: [{query: ListBrewersDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`/brewers/${data.createBrewer?.id}`)
      }
    },
    onError: err => {
      if (onCreateError) {
        onCreateError(err)
      }
    },
  })

  const typeOptions: {name: string; value: string}[] = [
    {
      name: 'Autodrip',
      value: BrewerType.Autodrip,
    },
    {
      name: 'Espresso',
      value: BrewerType.Espresso,
    },
    {
      name: 'Full Immersion',
      value: BrewerType.FullImmersion,
    },
    {
      name: 'Pourover',
      value: BrewerType.Pourover,
    },
  ]

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        type: null,
        ...initialValues,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createBrewer({
          variables: {
            input: values,
          },
        })
        setSubmitting(false)
      }}
      enableReinitialize
    >
      {({dirty, setFieldValue}) => {
        return (
          <Form>
            <Card variant={isModal ? 'blank' : 'default'} className="p-3 overflow-visible">
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('name') ? (
                <div className="mb-3">
                  <label className="block mb-2" htmlFor="name">
                    Name
                  </label>
                  <Field name="name" id="name" as={Input} />
                </div>
              ) : null}
              {!fields || fields.includes('description') ? (
                <div className="mb-3">
                  <label className="block mb-2" htmlFor="description">
                    Description
                  </label>
                  <Field name="description" id="description" as={Input} />
                </div>
              ) : null}
              {!fields || fields.includes('type') ? (
                <div className="mb-3">
                  <label className="block mb-2" htmlFor="type">
                    Type
                  </label>
                  <Select
                    options={typeOptions}
                    onChange={values => {
                      if (values.selectedItem) {
                        setFieldValue('type', values.selectedItem.value)
                      }
                    }}
                  />
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

export default BrewerCreateForm
