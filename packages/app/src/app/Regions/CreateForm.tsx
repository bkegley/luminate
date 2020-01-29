/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Formik, Form, Field} from 'formik'
import {Flex, Box, Heading, Combobox, Button, Field as ThemeField} from '@luminate/gatsby-theme-luminate/src'
import {useCreateRegionMutation, useListCountriesQuery} from '../../graphql'

const RegionCreateForm = () => {
  const [createRegion, {data, error, loading}] = useCreateRegionMutation()

  const {data: countryData, error: countryError, loading: countryLoading} = useListCountriesQuery()

  const countryOptions = countryData?.listCountries.edges.map(({node}) => {
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
      }}
      onSubmit={(values, {setSubmitting}) => {
        createRegion({
          variables: {
            input: {
              ...values,
              country: values.country.length ? values.country : null,
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
                <Heading>Create a Region</Heading>
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
                      setFieldValue('country', value.selectedItem?.value)
                    }}
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

export default RegionCreateForm
