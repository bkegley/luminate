/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Flex, Box, Field as ThemeField, Heading, Button, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {useUpdateCoffeeMutation, useListCountriesQuery, Coffee} from '../../graphql'
import {Formik, Form, Field} from 'formik'

interface Props {
  coffee: Coffee
}

const CoffeeUpdateForm = ({coffee}: Props) => {
  const [updateCoffee, {data, error, loading}] = useUpdateCoffeeMutation()
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
        name: coffee.name || '',
        country: coffee.country?.id || '',
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
      {({setFieldValue}) => {
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
                    label="Countries"
                    // @ts-ignore
                    options={options}
                    // @ts-ignore
                    initialSelectedItem={options?.find(option => option.value === coffee.country?.id)}
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

export default CoffeeUpdateForm
