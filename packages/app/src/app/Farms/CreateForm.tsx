/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button, Field as ThemeField} from 'theme-ui'
import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Combobox} from '@luminate/gatsby-theme-luminate/src'
import {
  useCreateFarmMutation,
  useListCountriesQuery,
  useListRegionsQuery,
  OperatorEnum,
  CreateFarmInput,
  CreateFarmMutation,
  ListFarmsDocument,
} from '../../graphql'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface FarmCreateFormProps {
  fields?: Array<keyof CreateFarmInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateFarmMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
}

const FarmCreateForm = ({fields, onCreateSuccess, onCreateError}: FarmCreateFormProps) => {
  const history = useHistory()
  const {url} = useRouteMatch()
  const [createFarm, {data, error, loading}] = useCreateFarmMutation({
    refetchQueries: [{query: ListFarmsDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`${url}/${data.createFarm?.id}`)
      }
    },
    onError: err => {
      if (onCreateError) {
        onCreateError(err)
      }
    },
  })

  const {data: countryData, error: countryError, loading: countryLoading} = useListCountriesQuery()
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
      }}
      onSubmit={async (values, {setSubmitting}) => {
        await createFarm({
          variables: {
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
                <Heading>Create a Farm</Heading>
              </Box>
              <Box>
                <Field name="name" label="Name" as={ThemeField} />
              </Box>
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
                            {
                              field: 'country',
                              operator: 'eq' as OperatorEnum,
                              value: value.selectedItem.value,
                            },
                          ],
                        })
                      }
                      setFieldValue('country', value.selectedItem?.value)
                    }}
                  />
                ) : null}
              </Box>
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
              <Box>
                <Button type="submit">Submit</Button>
              </Box>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default FarmCreateForm
