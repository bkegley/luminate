import React from 'react'
import {Card, Heading, Button, Input, Combobox, Modal, useDialogState} from '@luminate/gatsby-theme-luminate/src'
import {Formik, Form, Field} from 'formik'
import {
  useCreateRegionMutation,
  useListCountriesQuery,
  CreateRegionMutation,
  ListRegionsDocument,
  CreateRegionInput,
} from '../../graphql'
import {useHistory} from 'react-router-dom'
import CreateCountryForm from '../Countries/CreateForm'

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

  const createNewCountryDialog = useDialogState()

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
      enableReinitialize
    >
      {({dirty, setFieldValue, values}) => {
        return (
          <Form>
            <Modal dialog={createNewCountryDialog} className="bg-white p-3 rounded-md" top="100px" aria-label="Alert">
              <div>
                <CreateCountryForm
                  isModal
                  onCreateSuccess={res => {
                    setFieldValue('country', res.createCountry?.id)
                    createNewCountryDialog.toggle()
                  }}
                />
              </div>
            </Modal>
            <Card className="p-3 overflow-visible" variant={isModal ? 'blank' : 'default'}>
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
                    createNewDialog={createNewCountryDialog}
                  />
                </div>
              ) : null}
            </Card>
            <div className="flex justify-end mt-4 px-3 overflow-visible">
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

export default RegionCreateForm
