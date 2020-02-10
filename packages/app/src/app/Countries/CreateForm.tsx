/** @jsx jsx */
import {jsx, Flex, Box, Card, Heading, Button, Field as ThemeField} from 'theme-ui'
import React from 'react'
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
            <Card variant={isModal ? 'blank' : 'primary'} sx={{p: 3, overflow: 'visible'}}>
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('name') ? (
                <Box sx={{mb: 3}}>
                  <Field name="name" label="Name" as={ThemeField} />
                </Box>
              ) : null}
            </Card>
            <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
              <Box sx={{order: 1}}>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Box>
              {onCancel ? (
                <Box sx={{mr: 3}}>
                  <Button type="button" variant="text" onClick={() => onCancel(dirty)}>
                    Cancel
                  </Button>
                </Box>
              ) : null}
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CountryCreateForm
