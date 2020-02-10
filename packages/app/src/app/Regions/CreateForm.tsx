/** @jsx jsx */
import {jsx, Flex, Box, Card, Heading, Button, Field as ThemeField} from 'theme-ui'
import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Combobox} from '@luminate/gatsby-theme-luminate/src'
import {
  useCreateRegionMutation,
  useListCountriesQuery,
  CreateRegionMutation,
  ListRegionsDocument,
  CreateRegionInput,
} from '../../graphql'
import {useHistory} from 'react-router-dom'

interface RegionCreateFormProps {
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof CreateRegionInput>
  initialValues?: Partial<CreateRegionInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateRegionMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const RegionCreateForm = ({
  title,
  isModal,
  fields,
  initialValues,
  onCreateSuccess,
  onCreateError,
  onCancel,
}: RegionCreateFormProps) => {
  const history = useHistory()
  const [createRegion, {data, error, loading}] = useCreateRegionMutation({
    refetchQueries: [{query: ListRegionsDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`/app/regions/${data.createRegion?.id}`)
      }
    },
    onError: err => {
      if (onCreateError) {
        onCreateError(err)
      }
    },
  })

  const {data: countryData, error: countryError, loading: countryLoading} = useListCountriesQuery()

  const countryOptions = countryData?.listCountries.edges.map(({node}) => {
    return {
      name: node?.name,
      value: node?.id,
    }
  })

  return (
    <Formik
      initialValues={{
        name: '',
        country: '',
        ...initialValues,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createRegion({
          variables: {
            input: {
              ...values,
              country: values.country?.length ? values.country : null,
            },
          },
        })
        setSubmitting(false)
      }}
    >
      {({dirty, setFieldValue, values}) => {
        return (
          <Form>
            <Card variant={isModal ? 'blank' : 'primary'} sx={{p: 3}}>
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('name') ? (
                <Box sx={{mb: 3}}>
                  <Field name="name" label="Name" as={ThemeField} />
                </Box>
              ) : null}
              {!fields || fields.includes('country') ? (
                <Box sx={{mb: 3}}>
                  <Combobox
                    label="Country"
                    // @ts-ignore
                    options={countryOptions}
                    // @ts-ignore
                    initialSelectedItem={countryOptions?.find(option => option.value === values.country)}
                    loading={countryLoading}
                    onChange={value => {
                      setFieldValue('country', value.selectedItem?.value)
                    }}
                  />
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

export default RegionCreateForm
