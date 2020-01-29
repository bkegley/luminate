/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Flex, Box, Field as ThemeField, Heading, Button, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {useUpdateCoffeeMutation, useListCountriesQuery, useListRegionsQuery, Coffee} from '../../graphql'
import {Formik, Form, Field} from 'formik'

interface Props {
  coffee: Coffee
}

const CoffeeUpdateForm = ({coffee}: Props) => {
  const [updateCoffee, {data, error, loading}] = useUpdateCoffeeMutation()
  const {data: countryData, error: countryError, loading: countryLoading} = useListCountriesQuery()
  const {data: regionData, error: regionError, loading: regionLoading, refetch: regionRefetch} = useListRegionsQuery({
    variables: {query: [{field: 'country', operator: 'eq', value: coffee.country?.id}]},
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
  return (
    <Formik
      initialValues={{
        name: coffee.name || '',
        country: coffee.country?.id || '',
        region: coffee.region?.id || '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        updateCoffee({variables: {id: coffee.id, input: values}})
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
                <Heading>{coffee.id}</Heading>
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
                        regionRefetch({query: [{field: 'country', operator: 'eq', value: value.selectedItem.value}]})
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

export default CoffeeUpdateForm
