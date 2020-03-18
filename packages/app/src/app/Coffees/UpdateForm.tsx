/** @jsx jsx */
import {jsx, Flex, Box, Badge, Card, Field as ThemeField, Heading, Button, Close} from 'theme-ui'
import React from 'react'
import {Combobox, Modal, useDialogState, DialogDisclosure} from '@luminate/gatsby-theme-luminate/src'
import Alert from '../../components/Alert'
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
  useListVarietiesQuery,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'
import Tag from '../../components/Tag'

interface CoffeeUpdateFormProps {
  coffee: Coffee
  title?: React.ReactNode
  isModal?: boolean
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
  title,
  isModal,
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: CoffeeUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [updateCoffee, {data: updateData, error: updateError, loading: updateLoading}] = useUpdateCoffeeMutation({
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
  const [deleteCoffee, {data: deleteData, error: deleteError, loading: deleteLoading}] = useDeleteCoffeeMutation({
    variables: {id: coffee.id},
    refetchQueries: [{query: ListCoffeesDocument}],
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
  const {data: regionData, error: regionError, loading: regionLoading, refetch: regionRefetch} = useListRegionsQuery({
    variables: {query: [{field: 'country', operator: 'eq' as OperatorEnum, value: coffee.country?.id}]},
  })
  const {data: varietyData, error: varietyError, loading: varietyLoading} = useListVarietiesQuery()

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

  const createNewVarietyDialog = useDialogState()
  const deleteDialog = useDialogState()

  return (
    <Formik
      initialValues={{
        name: coffee.name || '',
        country: coffee.country?.id || '',
        region: coffee.region?.id || '',
        varieties: coffee.varieties
          ? coffee.varieties.map(variety => (variety ? {value: variety.id, name: variety.name} : null)).filter(Boolean)
          : [],
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateCoffee({
          variables: {
            id: coffee.id,
            input: {
              ...values,
              country: values.country.length ? values.country : null,
              region: values.region.length ? values.region : null,
              varieties: values.varieties.map(variety => (variety ? variety.value : null)).filter(Boolean),
            },
          },
        })
        setSubmitting(false)
      }}
    >
      {({setFieldValue, values}) => {
        const varietyOptions = varietyData?.listVarieties.edges
          .filter(({node}) => !values.varieties.find(value => value && node && value.value === node.id))
          .map(({node}) => {
            return {
              name: node?.name,
              value: node?.id,
            }
          })

        return (
          <React.Fragment>
            <Form>
              <Modal dialog={createNewVarietyDialog} className="bg-white p-3 rounded-md" top="100px" aria-label="Alert">
                <div>
                  <h1>Hey ma!</h1>
                </div>
              </Modal>
              <Modal dialog={deleteDialog} aria-label="Alert">
                <Box
                  sx={{
                    width: ['90vw', '75vw', '50vw'],
                    maxWidth: '600px',
                  }}
                >
                  <Alert
                    heading="Are you sure?"
                    text="This action cannot be undone."
                    onCancelClick={deleteDialog.toggle}
                    onConfirmClick={() => deleteCoffee({variables: {id: coffee.id}})}
                    variant="danger"
                  />
                </Box>
              </Modal>
              <Card variant={isModal ? 'blank' : 'primary'} sx={{p: 3, overflow: 'visible'}}>
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
                  </Box>
                ) : null}
                {!fields || fields.includes('region') ? (
                  <Box>
                    <Combobox
                      label="Region"
                      // @ts-ignore
                      options={regionOptions}
                      // @ts-ignore
                      initialSelectedItem={regionOptions?.find(option => option.value === values.region)}
                      loading={regionLoading}
                      onChange={value => setFieldValue('region', value.selectedItem?.value)}
                    />
                  </Box>
                ) : null}
                {!fields || fields.includes('varieties') ? (
                  <Box>
                    <Combobox
                      label="Varieties"
                      // @ts-ignore
                      options={varietyOptions}
                      // @ts-ignore
                      initialSelectedItem={varietyOptions?.find(option => option.value === values.varieties)}
                      loading={varietyLoading}
                      onChange={value =>
                        setFieldValue(
                          'varieties',
                          value.selectedItem ? values.varieties.concat(value.selectedItem) : values.varieties,
                        )
                      }
                      createNewDialog={createNewVarietyDialog}
                    />
                    <Flex sx={{flexWrap: 'wrap', px: 2}}>
                      {values.varieties.map(variety => {
                        return (
                          <Box key={variety?.value} sx={{m: 1}}>
                            <Tag
                              text={variety?.name || ''}
                              onCloseClick={() =>
                                setFieldValue(
                                  'varieties',
                                  values.varieties.filter(valueVariety => valueVariety?.value !== variety?.value),
                                )
                              }
                            />
                          </Box>
                        )
                      })}
                    </Flex>
                  </Box>
                ) : null}
              </Card>
              <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
                <Box sx={{order: 1}}>
                  <Button type="submit">Submit</Button>
                </Box>
                <Box sx={{mr: 2}}>
                  <DialogDisclosure {...deleteDialog} as={Button} variant="text">
                    Delete
                  </DialogDisclosure>
                </Box>
              </Flex>
            </Form>
          </React.Fragment>
        )
      }}
    </Formik>
  )
}

export default CoffeeUpdateForm
