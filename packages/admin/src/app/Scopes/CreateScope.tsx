/** @jsx jsx */

import {jsx} from 'theme-ui'
import {Formik, Form, Field} from 'formik'
import {useCreateScopeMutation, OperationEnum} from '../../graphql'
import {useHistory} from 'react-router-dom'

const CreateScope = () => {
  const [createScope] = useCreateScopeMutation()
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        resource: '',
        operation: 'read' as OperationEnum,
      }}
      onSubmit={values => {
        createScope({variables: {input: values}}).then(res => {
          if (!res.errors) {
            if (res.data && res.data.createScope) {
              // update cache here
              history.push(`/app/scopes/${res.data.createScope?.id}`)
            }
          }
        })
      }}
    >
      {() => {
        return (
          <Form>
            <div>
              <label htmlFor="resource">Resource</label>
              <Field id="resource" name="resource" type="text" />
            </div>
            <div>
              <label htmlFor="operation">Operation</label>
              <Field id="operation" name="operation" as="select">
                <option value="read">Read</option>
                <option value="write">Write</option>
              </Field>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CreateScope
