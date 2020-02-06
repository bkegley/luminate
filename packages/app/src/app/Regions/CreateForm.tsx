/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button, Field as ThemeField} from 'theme-ui'
import React from 'react'
import {Formik, Form, Field} from 'formik'
import {Combobox} from '@luminate/gatsby-theme-luminate/src'
import {
  useCreateRegionMutation,
  useListCountriesQuery,
  CreateRegionInput,
  CreateRegionMutation,
  ListRegionsDocument,
} from '../../graphql'
import {useHistory, useRouteMatch} from 'react-router-dom'

interface RegionCreateFormProps {
  fields?: Array<keyof CreateRegionInput>
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateRegionMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
}

const RegionCreateForm = ({fields, onCreateSuccess, onCreateError}: RegionCreateFormProps) => {
  const history = useHistory()
  const {url} = useRouteMatch()
  const [createRegion, {data, error, loading}] = useCreateRegionMutation({
    refetchQueries: [{query: ListRegionsDocument}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`${url}/${data.createRegion?.id}`)
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
                        setFieldValue('country', value.selectedItem?.value)
                      }}
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

export default RegionCreateForm
