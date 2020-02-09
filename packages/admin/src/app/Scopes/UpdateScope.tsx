/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Formik, Form, Field} from 'formik'
import {useGetScopeQuery, useUpdateScopeMutation, useDeleteScopeMutation, OperationEnum} from '../../graphql'
import {RouteChildrenProps, useHistory} from 'react-router-dom'

interface Params {
  id: string
}

interface Props extends RouteChildrenProps<Params> {}

const UpdateScope = ({match}: Props) => {
  const id = match?.params.id as string

  const {error, loading, data} = useGetScopeQuery({variables: {id}})
  const [updateScope] = useUpdateScopeMutation()
  const [deleteScope, {client}] = useDeleteScopeMutation()
  const history = useHistory()

  const handleDeleteClick = () => {
    deleteScope({variables: {id}}).then(res => {
      // update cache here as well
      history.push('/app/scopes')
    })
  }

  if (error || loading) return null

  return (
    <div>
      <Formik
        initialValues={{
          resource: data?.getScope?.resource || '',
          operation: (data?.getScope?.operation as OperationEnum) || ('read' as OperationEnum),
        }}
        onSubmit={values => {
          updateScope({
            variables: {
              id,
              input: values,
            },
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
      <div>
        <button type="button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default UpdateScope
