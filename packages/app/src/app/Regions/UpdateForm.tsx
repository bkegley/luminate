/** @jsx jsx */
import {jsx, Flex, Box, Card, Field as ThemeField, Heading, Button} from 'theme-ui'
import React from 'react'
import {Combobox} from '@luminate/gatsby-theme-luminate/src'
import {
  useUpdateRegionMutation,
  useDeleteRegionMutation,
  ListRegionsDocument,
  useListCountriesQuery,
  useListRegionsQuery,
  Region,
  OperatorEnum,
  UpdateRegionMutation,
  DeleteRegionMutation,
  UpdateRegionInput,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface RegionUpdateFormProps {
  region: Region
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof UpdateRegionInput>
  /* Add functionality when entity successfully updates */
  onUpdateSuccess?: (data: UpdateRegionMutation) => void
  /* Add functionality when entity fails to update */
  onUpdateError?: (err: any) => void
  /* Add functionality when entity is successfully deleted - default is to redirect to list view */
  onDeleteSuccess?: (data: DeleteRegionMutation) => void
  /* Add functionality when entity fails to */
  onDeleteError?: (err: any) => void
}

const RegionUpdateForm = ({
  region,
  title,
  isModal,
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: RegionUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [updateRegion, {data: updateData, error: updateError, loading: updateLoading}] = useUpdateRegionMutation({
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
  const [deleteRegion, {data: deleteData, error: deleteError, loading: deleteLoading}] = useDeleteRegionMutation({
    variables: {id: region.id},
    refetchQueries: [{query: ListRegionsDocument}],
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
        name: region.name || '',
        country: region.country?.id || '',
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateRegion({
          variables: {
            id: region.id,
            input: {
              ...values,
              country: values.country.length ? values.country : null,
            },
          },
        })
        setSubmitting(false)
      }}
    >
      {({setFieldValue, values}) => {
        return (
          <Form>
            <Card variant={isModal ? 'blank' : 'primary'} sx={{p: 3}}>
              {title ? <Heading>{title}</Heading> : null}
              {!fields || fields.includes('name') ? (
                <Box>
                  <Field name="name" label="Name" as={ThemeField} />
                </Box>
              ) : null}
              {!fields || fields.includes('country') ? (
                <Box>
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
                <Button type="submit">Submit</Button>
              </Box>
              <Box sx={{mr: 2}}>
                <Button type="button" variant="buttons.text" onClick={() => deleteRegion()}>
                  Delete
                </Button>
              </Box>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegionUpdateForm
