/** @jsx jsx */
import {jsx, Flex, Box, Card, Field as ThemeField, Heading, Button} from 'theme-ui'
import React from 'react'
import {Combobox, Modal, useDialogState, DialogDisclosure} from '@luminate/gatsby-theme-luminate/src'
import Alert from '../../components/Alert'
import {
  useUpdateFarmMutation,
  useDeleteFarmMutation,
  ListFarmsDocument,
  useListCountriesQuery,
  useListRegionsQuery,
  Farm,
  OperatorEnum,
  UpdateFarmMutation,
  DeleteFarmMutation,
  UpdateFarmInput,
} from '../../graphql'
import {Formik, Form, Field} from 'formik'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface FarmUpdateFormProps {
  farm: Farm
  title?: React.ReactNode
  isModal?: boolean
  fields?: Array<keyof UpdateFarmInput>
  /* Add functionality when entity successfully updates */
  onUpdateSuccess?: (data: UpdateFarmMutation) => void
  /* Add functionality when entity fails to update */
  onUpdateError?: (err: any) => void
  /* Add functionality when entity is successfully deleted - default is to redirect to list view */
  onDeleteSuccess?: (data: DeleteFarmMutation) => void
  /* Add functionality when entity fails to */
  onDeleteError?: (err: any) => void
}

const FarmUpdateForm = ({
  farm,
  title,
  isModal,
  fields,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
}: FarmUpdateFormProps) => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [updateFarm, {data: updateData, error: updateError, loading: updateLoading}] = useUpdateFarmMutation({
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
  const [deleteFarm, {data: deleteData, error: deleteError, loading: deleteLoading}] = useDeleteFarmMutation({
    variables: {id: farm.id},
    refetchQueries: [{query: ListFarmsDocument}],
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
    variables: {query: [{field: 'country', operator: 'eq' as OperatorEnum, value: farm.country?.id}]},
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

  const deleteDialog = useDialogState()

  return (
    <Formik
      initialValues={{
        name: farm.name || '',
        country: farm.country?.id || '',
        region: farm.region?.id || '',
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await updateFarm({
          variables: {
            id: farm.id,
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
                  onConfirmClick={() => deleteFarm({variables: {id: farm.id}})}
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
                          query: [{field: 'country', operator: 'eq' as OperatorEnum, value: value.selectedItem.value}],
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
            </Card>
            <Flex sx={{justifyContent: 'flex-end', mt: 4, px: 3}}>
              <Box sx={{order: 1}}>
                <Button type="submit">Submit</Button>
              </Box>
              <DialogDisclosure {...deleteDialog} as={Button} variant="text">
                Delete
              </DialogDisclosure>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default FarmUpdateForm
