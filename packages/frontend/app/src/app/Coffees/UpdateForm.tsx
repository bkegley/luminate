import React from 'react'
import {Combobox, Card, Input, Heading, Button, Page, Badge} from '@luminate/components'
import {Modal, useDialogState, DialogDisclosure} from '@luminate/gatsby-theme-luminate/src'
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
import CreateVarietyForm from '../Varieties/CreateForm'

interface CoffeeUpdateFormProps {
  coffee: Coffee
  title?: string
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

  const {
    data: countryData,
    error: countryError,
    loading: countryLoading,
    refetch: countryRefetch,
  } = useListCountriesQuery()
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
          <Form>
            <Modal dialog={createNewVarietyDialog} className="p-3 bg-white rounded-md" top="100px" aria-label="Alert">
              <div>
                <CreateVarietyForm isModal />
              </div>
            </Modal>
            <Modal
              className="p-3 bg-white rounded-md w-screen-5/6 md:w-screen-3/4 lg:w-screen-1/3"
              top="100px"
              dialog={deleteDialog}
              aria-label="Alert"
            >
              <Alert
                heading="Are you sure?"
                text="This action cannot be undone."
                onCancelClick={deleteDialog.toggle}
                onConfirmClick={() => deleteCoffee({variables: {id: coffee.id}})}
                variant="danger"
              />
            </Modal>
            <Page title={title}>
              <Card>
                {title ? <Heading>{title}</Heading> : null}
                {!fields || fields.includes('name') ? (
                  <div className="mb-3">
                    <label className="block mb-1" htmlFor="name">
                      Name
                    </label>
                    <Field name="name" id="name" as={Input} />
                  </div>
                ) : null}
                {!fields || fields.includes('country') ? (
                  <div className="mb-3">
                    <label className="block mb-1" htmlFor="country">
                      Country
                    </label>
                    <Combobox
                      id="country"
                      options={countryOptions}
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
                  </div>
                ) : null}
                {!fields || fields.includes('region') ? (
                  <div className="mb-3">
                    <label className="block mb-1" htmlFor="region">
                      Region
                    </label>
                    <Combobox
                      id="region"
                      options={regionOptions}
                      initialSelectedItem={regionOptions?.find(option => option.value === values.region)}
                      loading={regionLoading}
                      onChange={value => setFieldValue('region', value.selectedItem?.value)}
                    />
                  </div>
                ) : null}
                {!fields || fields.includes('varieties') ? (
                  <div className="mb-3">
                    <label className="block mb-1" htmlFor="varieties">
                      Varieties
                    </label>
                    <Combobox
                      id="varieties"
                      options={varietyOptions}
                      loading={varietyLoading}
                      onChange={value =>
                        setFieldValue(
                          'varieties',
                          value.selectedItem ? values.varieties.concat(value.selectedItem) : values.varieties,
                        )
                      }
                      createNewDialog={createNewVarietyDialog}
                    />
                    <div className="flex flex-wrap px-2">
                      {values.varieties.map(variety => {
                        return (
                          <div key={variety?.value} className="m-1">
                            <Badge
                              onCloseClick={() =>
                                setFieldValue(
                                  'varieties',
                                  values.varieties.filter(valueVariety => valueVariety?.value !== variety?.value),
                                )
                              }
                            >
                              {variety?.name}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
                <Card.Footer>
                  <div className="flex justify-end px-3 mt-4">
                    <div className="order-1">
                      <Button type="submit">Submit</Button>
                    </div>
                    <div className="mr-2">
                      <DialogDisclosure {...deleteDialog} as={Button} variant="outline">
                        Delete
                      </DialogDisclosure>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </Page>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CoffeeUpdateForm
