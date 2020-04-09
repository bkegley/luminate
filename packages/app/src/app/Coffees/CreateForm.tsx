import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Combobox, Heading, Card, Button, Input, Modal, useDialogState} from '@luminate/gatsby-theme-luminate/src'
import {
  useCreateCoffeeMutation,
  useListCountriesQuery,
  useListRegionsQuery,
  OperatorEnum,
  CreateCoffeeMutation,
  ListCoffeesDocument,
  CreateCoffeeInput,
} from '../../graphql'
import {useHistory} from 'react-router-dom'
import CreateCountryForm from '../Countries/CreateForm'
import CreateRegionForm from '../Regions/CreateForm'

interface CoffeeCreateFormProps {
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof CreateCoffeeInput>
  initialValues?: Partial<CreateCoffeeInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateCoffeeMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const CoffeeCreateForm = ({
  title,
  isModal,
  fields,
  initialValues,
  onCreateSuccess,
  onCreateError,
  onCancel,
}: CoffeeCreateFormProps) => {
  const history = useHistory()
  const [createCoffee, {data, error, loading}] = useCreateCoffeeMutation({
    refetchQueries: [{query: ListCoffeesDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`/app/coffees/${data.createCoffee?.id}`)
      }
    },
    onError: err => {
      if (onCreateError) {
        onCreateError(err)
      }
    },
  })

  const {
    data: countryData,
    error: countryError,
    loading: countryLoading,
    refetch: countryRefetch,
  } = useListCountriesQuery()
  const {data: regionData, error: regionError, loading: regionLoading, refetch: regionRefetch} = useListRegionsQuery()

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

  const createNewCountryDialog = useDialogState()
  const createNewRegionDialog = useDialogState()

  return (
    <Formik
      initialValues={{
        name: '',
        country: '',
        region: '',
        ...initialValues,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createCoffee({
          variables: {
            input: {
              ...values,
              country: values.country?.length ? values.country : null,
              region: values.region?.length ? values.region : null,
            },
          },
        })
        setSubmitting(false)
      }}
      enableReinitialize
    >
      {({dirty, setFieldValue, values}) => {
        return (
          <Form>
            <Modal dialog={createNewCountryDialog} className="bg-white p-3 rounded-md" top="100px" aria-label="Alert">
              <div>
                <CreateCountryForm
                  isModal
                  onCreateSuccess={async res => {
                    // TODO: this could refactor to a getGeographyQuery {getCountry.... getRegion($countryId: ID!)...}
                    await Promise.all([
                      countryRefetch(),
                      regionRefetch({
                        query: [{field: 'country', operator: 'eq' as OperatorEnum, value: res.createCountry?.id}],
                      }),
                    ])
                    setFieldValue('country', res.createCountry?.id)
                    setFieldValue('region', '')
                    createNewCountryDialog.toggle()
                  }}
                />
              </div>
            </Modal>
            <Modal dialog={createNewRegionDialog} className="bg-white p-3 rounded-md" top="100px" aria-label="Alert">
              <div>
                <CreateRegionForm
                  isModal
                  initialValues={{country: values.country}}
                  fields={['name']}
                  onCreateSuccess={res => {
                    setFieldValue('region', res.createRegion?.id)
                    regionRefetch({
                      query: [{field: 'country', operator: 'eq' as OperatorEnum, value: values.country}],
                    })
                    createNewRegionDialog.toggle()
                  }}
                />
              </div>
            </Modal>
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
              {!fields || fields.includes('country') ? (
                <div className="mb-3">
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
                          query: [{field: 'country', operator: 'eq' as OperatorEnum, value: value.selectedItem.value}],
                        })
                      }
                      setFieldValue('country', value.selectedItem?.value)
                    }}
                    createNewDialog={createNewCountryDialog}
                  />
                </div>
              ) : null}
              {!fields || fields.includes('region') ? (
                <div className="mb-3">
                  <Combobox
                    label="Region"
                    // @ts-ignore
                    options={regionOptions}
                    // @ts-ignore
                    initialSelectedItem={regionOptions?.find(option => option.value === values.region)}
                    loading={regionLoading}
                    onChange={value => setFieldValue('region', value.selectedItem?.value)}
                    createNewDialog={createNewRegionDialog}
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

export default CoffeeCreateForm
