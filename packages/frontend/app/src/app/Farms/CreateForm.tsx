import React from 'react'
import {Card, Combobox, Button, Input} from '@luminate/components'
import {Formik, Form, Field} from 'formik'
import {
  useCreateFarmMutation,
  useListCountriesQuery,
  useListRegionsQuery,
  OperatorEnum,
  CreateFarmMutation,
  ListFarmsDocument,
  CreateFarmInput,
} from '../../graphql'
import {useHistory} from 'react-router-dom'

interface FarmCreateFormProps {
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof CreateFarmInput>
  initialValues?: Partial<CreateFarmInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateFarmMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const FarmCreateForm = ({
  title,
  isModal,
  fields,
  initialValues,
  onCreateSuccess,
  onCreateError,
  onCancel,
}: FarmCreateFormProps) => {
  const history = useHistory()
  const [createFarm, {data, error, loading}] = useCreateFarmMutation({
    refetchQueries: [{query: ListFarmsDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`/farms/${data.createFarm?.id}`)
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

  return (
    <Formik
      initialValues={{
        name: '',
        country: '',
        region: '',
        ...initialValues,
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createFarm({
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
            <Card>
              {' '}
              <div className="p-6">
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
              </div>
              <Card.Footer>
                <div className="flex justify-end mt-4 px-3">
                  <div className="order-1">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </div>
                  {onCancel ? (
                    <div className="mr-3">
                      <Button type="button" variant="outline" onClick={() => onCancel(dirty)}>
                        Cancel
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Card.Footer>
            </Card>
          </Form>
        )
      }}
    </Formik>
  )
}

export default FarmCreateForm
