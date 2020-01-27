/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Flex, Box, Field as ThemeField, Heading, Button} from '@luminate/gatsby-theme-luminate/src'
import {useUpdateCoffeeMutation, Coffee} from '../../graphql'
import {Formik, Form, Field} from 'formik'

interface Props {
  coffee: Coffee
}

const CoffeeUpdateForm = ({coffee}: Props) => {
  const [updateCoffee, {data, error, loading}] = useUpdateCoffeeMutation()
  return (
    <Formik
      initialValues={{
        name: coffee.name || '',
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
      {() => {
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
