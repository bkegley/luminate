import React from 'react'
import {
  Card,
  Heading,
  Button,
  Input,
  Combobox,
  Modal,
  useDialogState,
  DialogDisclosure,
} from '@luminate/gatsby-theme-luminate/src'
import Alert from '../../components/Alert'
import {
  useUpdateRegionMutation,
  useDeleteRegionMutation,
  ListRegionsDocument,
  useListCountriesQuery,
  Region,
  UpdateRegionMutation,
  DeleteRegionMutation,
  UpdateRegionInput,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'
import CreateCountryForm from '../Countries/CreateForm'

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

  const createNewCountryDialog = useDialogState()
  const deleteDialog = useDialogState()

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
            <Modal dialog={deleteDialog} className="bg-white p-3 rounded-md" top="100px" aria-label="Alert">
              <div className="w-screen-11/12 md:w-screen-3/4 lg:w-screen-1/2">
                <Alert
                  heading="Are you sure?"
                  text="This action cannot be undone."
                  onCancelClick={deleteDialog.toggle}
                  onConfirmClick={() => deleteRegion({variables: {id: region.id}})}
                  variant="danger"
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
            <div className="flex justify-end mt-4 px-3">
              <div className="order-1">
                <Button type="submit">Submit</Button>
              </div>
              <div className="mr-2">
                <DialogDisclosure {...deleteDialog} as={Button} variant="text">
                  Delete
                </DialogDisclosure>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegionUpdateForm
