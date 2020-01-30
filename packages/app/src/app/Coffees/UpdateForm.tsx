/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {Flex, Box, Field as ThemeField, Heading, Button, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {
  useUpdateCoffeeMutation,
  useDeleteCoffeeMutation,
  ListCoffeesDocument,
  useListCountriesQuery,
  useListRegionsQuery,
  Coffee,
  OperatorEnum,
  UpdateCoffeeMutation,
  DeleteCoffeeMutation,
  UpdateCoffeeInput,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface CoffeeUpdateFormProps {
  coffee: Coffee
  fields?: Array<keyof UpdateCoffeeInput>
  /* Add functionality when entity successfully updates */
  onUpdateSuccess?: (data: UpdateCoffeeMutation) => void
  /* Add functionality when entity fails to update */
  onUpdateError?: (err: any) => void
  /* Add functionality when entity is successfully deleted - default is to redirect to list view */
  onDeleteSuccess?: (data: DeleteCoffeeMutation) => void
  /* Add functionality when entity fails to */
  onDeleteError?: (err: any) => void
}

const CoffeeUpdateForm = ({
  coffee,
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: CoffeeUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [updateCoffee, {data: updateData, error: updateError, loading: updateLoading}] = useUpdateCoffeeMutation()
  const [deleteCoffee, {data: deleteData, error: deleteError, loading: deleteLoading}] = useDeleteCoffeeMutation({
    variables: {id: coffee.id},
    refetchQueries: [{query: ListCoffeesDocument}],
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
  const {data: regionData, error: regionError, loading: regionLoading, refetch: regionRefetch} = useListRegionsQuery({
    variables: {query: [{field: 'country', operator: 'eq' as OperatorEnum, value: coffee.country?.id}]},
  })

  const countryOptions = countryData?.listCountries.edges.map(({node}) => {
    return {
      name: node?.name,
      value: node?.id,
    }
  })

  const regionOptions = regionData?.listRegions.edges.map(({node}) => {
    return {
      name: node?.name,
      value: node?.id,
    }
  })

  return (
    <Formik
      initialValues={{
        name: coffee.name || '',
        country: coffee.country?.id || '',
        region: coffee.region?.id || '',
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateCoffee({
          variables: {
            id: coffee.id,
            input: {
              ...values,
              country: values.country.length ? values.country : null,
              region: values.region.length ? values.region : null,
            },
          },
        })
        setSubmitting(false)
      }}
    >
      {({setFieldValue, values}) => {
        return (
          <Form>
            <Flex sx={{flexDirection: 'column'}}>
              <Box>
                <Heading>{coffee.id}</Heading>
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
                      options={countryOptions}
                      // @ts-ignore
                      initialSelectedItem={countryOptions?.find(option => option.value === values.country)}
                      onChange={value => {
                        if (value.selectedItem) {
                          if (value.selectedItem.value !== values.country) {
                            setFieldValue('region', '')
                          }
                          regionRefetch({
                            query: [
                              {field: 'country', operator: 'eq' as OperatorEnum, value: value.selectedItem.value},
                            ],
                          })
                        }
                        setFieldValue('country', value.selectedItem?.value)
                      }}
                    />
                  ) : null}
                </Box>
              ) : null}
              {!fields || fields.includes('region') ? (
                <Box>
                  {regionData ? (
                    <Combobox
                      label="Region"
                      // @ts-ignore
                      options={regionOptions}
                      // @ts-ignore
                      initialSelectedItem={regionOptions?.find(option => option.value === values.region)}
                      onChange={value => setFieldValue('region', value.selectedItem?.value)}
                    />
                  ) : null}
                </Box>
              ) : null}
              <Flex sx={{justifyContent: 'flex-end'}}>
                <Box sx={{order: 1}}>
                  <Button type="submit">Submit</Button>
                </Box>
                <Box sx={{mr: 2}}>
                  <Button type="button" variant="buttons.text" onClick={() => deleteCoffee()}>
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

export default CoffeeUpdateForm
