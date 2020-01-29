/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Heading, Combobox, Button, Field as ThemeField} from '@luminate/gatsby-theme-luminate/src'
import {useCreateFarmMutation, useListCountriesQuery, useListRegionsQuery, OperatorEnum} from '../../graphql'

const FarmCreateForm = () => {
  const [createFarm, {data, error, loading}] = useCreateFarmMutation()

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
      onSubmit={(values, {setSubmitting}) => {
        createFarm({
          variables: {
            input: {
              ...values,
              country: values.country.length ? values.country : null,
              region: values.region.length ? values.region : null,
            },
          },
        })
          .then(res => {
            console.log({res})
            setSubmitting(false)
          })
          .catch(err => {
            console.log({err})
            setSubmitting(false)
          })
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
