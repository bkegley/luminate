/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {Flex, Box, Field as ThemeField, Heading, Button, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {
  useUpdateRegionMutation,
  useListCountriesQuery,
  Region,
  UpdateRegionInput,
  UpdateRegionMutation,
  DeleteRegionMutation,
  useDeleteRegionMutation,
  ListRegionsDocument,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface CountryUpdateFormProps {
  region: Region
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
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: CountryUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [updateRegion, {data: updateData, error: updateError, loading: updateLoading}] = useUpdateRegionMutation()
  const [deleteRegion, {data: deleteData, error: deleteError, loading: deleteLoading}] = useDeleteRegionMutation({
    variables: {id: region.id},
    refetchQueries: [{query: ListRegionsDocument}],
  })

  // handle update response
  React.useEffect(() => {
    if (updateData && onUpdateSuccess) {
      onUpdateSuccess(updateData)
    }

    if (updateError && onUpdateError) {
      onUpdateError(updateError)
    }
  }, [updateData, onUpdateSuccess, updateError, onUpdateError])

  // handle delete response
  React.useEffect(() => {
    if (deleteData) {
      if (onDeleteSuccess) {
        onDeleteSuccess(deleteData)
      } else {
        history.push(path.slice(0, path.indexOf('/:id')))
      }
    }

    if (deleteError && onDeleteError) {
      onDeleteError(deleteError)
    }
  }, [deleteData, onDeleteSuccess, deleteError, onDeleteError])

  const {data: countryData, error: countryError, loading: countryLoading} = useListCountriesQuery()
  const options = countryData?.listCountries.edges.map(({node}) => {
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
      onSubmit={(values, {setSubmitting}) => {
        updateRegion({variables: {id: region.id, input: values}})
          .then(res => {
            console.log({res})
            setSubmitting(false)
          })
          .catch(err => {
            console.log({err})
            setSubmitting(false)
          })
      }}
    >
      {({setFieldValue}) => {
        return (
          <Form>
            <Flex sx={{flexDirection: 'column'}}>
              <Box>
                <Heading>{region.id}</Heading>
              </Box>
              {!fields || fields.includes('name') ? (
                <Box>
                  <Field name="name" label="Name" as={ThemeField} />
                </Box>
              ) : null}
              {!fields || fields.includes('country') ? (
                <Box>
                  {countryData ? (
                    <Combobox
                      label="Country"
                      // @ts-ignore
                      options={options}
                      // @ts-ignore
                      initialSelectedItem={options?.find(option => option.value === region.country?.id)}
                      onChange={value => setFieldValue('country', value.selectedItem?.value)}
                    />
                  ) : null}
                </Box>
              ) : null}
              <Flex sx={{justifyContent: 'flex-end'}}>
                <Box sx={{order: 1}}>
                  <Button type="submit">Submit</Button>
                </Box>
                <Box sx={{mr: 2}}>
                  <Button type="button" variant="buttons.text" onClick={() => deleteRegion()}>
                    Delete
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegionUpdateForm
