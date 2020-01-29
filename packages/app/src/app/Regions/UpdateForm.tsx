/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Flex, Box, Field as ThemeField, Heading, Button, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {useUpdateRegionMutation, useListCountriesQuery, Region} from '../../graphql'
import {Formik, Form, Field} from 'formik'

interface Props {
  region: Region
}

const RegionUpdateForm = ({region}: Props) => {
  const [updateRegion, {data, error, loading}] = useUpdateRegionMutation()
  const {data: countryData, error: countryError, loading: countryLoading} = useListCountriesQuery()
  const options = countryData?.listCountries.edges.map(({node}) => {
    return {
      name: node?.name,
      value: node?.id,
    }
  })
  return (
    <Formik
      initialValues={{
        name: region.name || '',
        country: region.country?.id || '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        updateRegion({variables: {id: region.id, input: values}})
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
      {({setFieldValue}) => {
        return (
          <Form>
            <Flex sx={{flexDirection: 'column'}}>
              <Box>
                <Heading>{region.id}</Heading>
              </Box>
              <Box>
                <Field name="name" label="Name" as={ThemeField} />
              </Box>
              <Box>
                {countryData ? (
                  <Combobox
                    label="Country"
                    // @ts-ignore
                    options={options}
                    // @ts-ignore
                    initialSelectedItem={options?.find(option => option.value === region.country?.id)}
                    onChange={value => setFieldValue('country', value.selectedItem?.value)}
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

export default RegionUpdateForm
