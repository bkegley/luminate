import React from 'react'
import {Card, Heading, Button, Input} from '@luminate/gatsby-theme-luminate/src'
import {Formik, Form, Field} from 'formik'
import {useCreateCountryMutation, CreateCountryMutation, ListCountriesDocument, CreateCountryInput} from '../../graphql'
import {useHistory} from 'react-router-dom'

interface CountryCreateFormProps {
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof CreateCountryInput>
  initialValues?: Partial<CreateCountryInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateCountryMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const CountryCreateForm = ({
  title,
  isModal,
  fields,
  initialValues,
  onCreateSuccess,
  onCreateError,
  onCancel,
}: CountryCreateFormProps) => {
  const history = useHistory()
  const [createCountry, {data, error, loading}] = useCreateCountryMutation({
    refetchQueries: [{query: ListCountriesDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`/app/countries/${data.createCountry?.id}`)
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
        ...initialValues,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createCountry({
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
            <Card className="p-3 overflow-visible" variant={isModal ? 'blank' : 'default'}>
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('name') ? (
                <div className="mb-3">
                  <label className="block mb-2" htmlFor="name">
                    Name
                  </label>
                  <Field name="name" id="name" as={Input} />
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

export default CountryCreateForm
