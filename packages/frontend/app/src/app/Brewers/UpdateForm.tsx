import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Card, Button, Input, Select} from '@luminate/gatsby-theme-luminate/src'
import {useUpdateBrewerMutation, UpdateBrewerMutation, UpdateBrewerInput, BrewerType, Brewer} from '../../graphql'

interface BrewerCreateFormProps {
  brewer: Brewer
  isModal?: boolean
  fields?: Array<keyof UpdateBrewerInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onUpdateSuccess?: (data: UpdateBrewerMutation) => void
  /* Add functionality when entity fails to create */
  onUpdateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const BrewerUpdateForm = ({
  isModal,
  fields,
  brewer,
  onUpdateSuccess,
  onUpdateError,
  onCancel,
}: BrewerCreateFormProps) => {
  const [updateBrewer, {data, error, loading}] = useUpdateBrewerMutation({
    onCompleted: data => {
      if (onUpdateSuccess) {
        onUpdateSuccess(data)
      } else {
      }
    },
    onError: err => {
      if (onUpdateError) {
        onUpdateError(err)
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

  const initialType = typeOptions.find(option => option.value === brewer.type) ?? typeOptions[0]

  return (
    <Formik
      initialValues={{
        name: brewer.name || '',
        description: brewer.description || '',
        type: initialType.value,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateBrewer({
          variables: {
            id: brewer.id,
            input: {
              ...values,
              type: values.type as BrewerType,
            },
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
                    initialSelectedItem={initialType}
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

export default BrewerUpdateForm
