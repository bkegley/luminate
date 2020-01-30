/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Heading, Combobox, Button, Field as ThemeField} from '@luminate/gatsby-theme-luminate/src'
import {
  useCreateCoffeeMutation,
  useListCountriesQuery,
  useListRegionsQuery,
  OperatorEnum,
  CreateCoffeeMutation,
  ListCoffeesDocument,
  CreateCoffeeInput,
} from '../../graphql'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface CoffeeCreateFormProps {
  fields?: Array<keyof CreateCoffeeInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateCoffeeMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
}

const CoffeeCreateForm = ({fields, onCreateSuccess, onCreateError}: CoffeeCreateFormProps) => {
  const history = useHistory()
  const {url} = useRouteMatch()
  const [createCoffee, {data, error, loading}] = useCreateCoffeeMutation({
    refetchQueries: [{query: ListCoffeesDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`${url}/${data.createCoffee?.id}`)
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
        await createCoffee({
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
                <Heading>Create a Coffee</Heading>
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

export default CoffeeCreateForm
