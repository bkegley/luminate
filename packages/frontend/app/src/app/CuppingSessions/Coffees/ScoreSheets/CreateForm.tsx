import React from 'react'
import {
  useCreateScoreSheetMutation,
  CreateScoreSheetMutation,
  GetCuppingSessionCoffeeDocument,
  useUserSearchQuery,
} from '../../../../graphql'
import {Formik, Form, Field} from 'formik'
import EvalScore from './EvalScore'
import {Button, Select} from '@luminate/gatsby-theme-luminate/src'
import {useRouteMatch, useHistory} from 'react-router-dom'

interface ScoreSheetCreateFormProps {
  sessionCoffeeId: string
  /* Add functionality when entity successfully creates - default is to redirect to detail view*/
  onCreateSuccess?: (data: CreateScoreSheetMutation) => void
  /* Add functionality when entity fails to create */
  onCreateError?: (err: any) => void
  onCancel?: (dirty: boolean) => void
}

const ScoreSheetCreateForm = ({
  sessionCoffeeId,
  onCancel,
  onCreateError,
  onCreateSuccess,
}: ScoreSheetCreateFormProps) => {
  const match = useRouteMatch()
  const history = useHistory()
  const {error, loading, data} = useUserSearchQuery({variables: {searchText: ''}})
  const [createScoreSheet] = useCreateScoreSheetMutation({
    refetchQueries: [{query: GetCuppingSessionCoffeeDocument, variables: {id: sessionCoffeeId}}],
    onCompleted: data => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
      } else {
        history.push(`${match.url}/coffees/${sessionCoffeeId}/scoreSheets/${data.createScoreSheet?.id}`)
      }
    },
    onError: err => {
      if (onCreateError) {
        onCreateError(err)
      }
    },
  })

  return (
    <Formik
      initialValues={{
        userId: '',
        fragranceAroma: 6,
        flavor: 6,
        aftertaste: 6,
        acidity: 6,
        body: 6,
        uniformity: 6,
        cleanCup: 6,
        balance: 6,
        sweetness: 6,
        overall: 6,
        taints: {
          numberOfCups: 0,
          intensity: 0,
        },
        defects: {
          numberOfCups: 0,
          intensity: 0,
        },
      }}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        createScoreSheet({
          variables: {
            input: values,
            sessionCoffeeId: sessionCoffeeId,
          },
        }).then(res => {
          setSubmitting(false)
        })
      }}
    >
      {({setFieldValue}) => {
        return (
          <Form>
            <div className="mb-4">
              <label className="mb-2" htmlFor="user">
                User
              </label>
              <Select
                onChange={({selectedItem}) => {
                  if (selectedItem) {
                    setFieldValue('userId', selectedItem.value)
                  }
                }}
                options={data?.listUsers.edges.map(({node}) => {
                  return {
                    name: node.username,
                    value: node.id,
                  }
                })}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2" htmlFor="fragranceAroma">
                Fragrance/Aroma
              </label>
              <EvalScore
                id="fragranceAroma"
                onChange={value => setFieldValue('fragranceAroma', value.selectedItem?.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2" htmlFor="flavor">
                Acidity
              </label>
              <EvalScore id="flavor" onChange={value => setFieldValue('flavor', value.selectedItem?.value)} />
            </div>
            <div className="mb-4">
              <label className="mb-2" htmlFor="aftertaste">
                Acidity
              </label>
              <EvalScore id="aftertaste" onChange={value => setFieldValue('aftertaste', value.selectedItem?.value)} />
            </div>
            <div className="mb-4">
              <label className="mb-2" htmlFor="acidity">
                Acidity
              </label>
              <EvalScore id="acidity" onChange={value => setFieldValue('acidity', value.selectedItem?.value)} />
            </div>
            <div className="mb-4">
              <label className="mb-2" htmlFor="body">
                Acidity
              </label>
              <EvalScore id="body" onChange={value => setFieldValue('body', value.selectedItem?.value)} />
            </div>
            <div>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ScoreSheetCreateForm
