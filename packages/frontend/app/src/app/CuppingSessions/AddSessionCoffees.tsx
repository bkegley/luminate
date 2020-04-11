import React from 'react'
import {useUpdateCuppingSessionMutation, CuppingSession, useListCoffeesQuery} from '../../graphql'
import {Formik, Form, FieldArray, Field} from 'formik'
import {Input, Combobox, Modal, useDialogState, Button} from '@luminate/gatsby-theme-luminate/src'
import CreateNewCoffeeForm from '../Coffees/CreateForm'

interface AddSessionCoffeesProps {
  cuppingSession?: CuppingSession
}

const AddSessionCoffees = ({cuppingSession}: AddSessionCoffeesProps) => {
  const [updateCuppingSession, {}] = useUpdateCuppingSessionMutation()
  const createNewCoffeeDialog = useDialogState()

  const {data: coffeeData, error: coffeeError, loading: coffeeLoading, refetch: coffeeRefetch} = useListCoffeesQuery()

  const coffeeOptions = coffeeData?.listCoffees.edges.map(({node}) => {
    return {
      name: node.name,
      value: node.id,
    }
  })

  if (!cuppingSession) {
    return null
  }

  return (
    <>
      <Modal dialog={createNewCoffeeDialog}>
        <CreateNewCoffeeForm />
      </Modal>
      <Formik
        initialValues={{
          sessionCoffees:
            cuppingSession.sessionCoffees?.map(session => ({
              sampleNumber: session?.sampleNumber || '',
              coffee: session?.coffee.id || '',
            })) || [],
        }}
        onSubmit={(values, {setSubmitting}) => {
          updateCuppingSession({
            variables: {
              id: cuppingSession.id,
              input: values,
            },
          })
            .then(res => {
              setSubmitting(false)
            })
            .catch(err => {
              setSubmitting(false)
            })
        }}
      >
        {({values, setFieldValue}) => {
          return (
            <Form>
              <div>This is our form!</div>
              <FieldArray name="sessionCoffees">
                {arrayHelpers => {
                  return (
                    <>
                      {values.sessionCoffees.map((session, index) => {
                        return (
                          <div className="flex items-center">
                            <div>
                              <Field as={Input} name={`sessionCoffees.${index}.sampleNumber`} />
                            </div>
                            <div>
                              <Combobox
                                label="Coffee"
                                options={coffeeOptions}
                                // @ts-ignore
                                initialSelectedItem={coffeeOptions?.find(option => option.value === session.coffee)}
                                loading={coffeeLoading}
                                onChange={value => {
                                  setFieldValue(`sessionCoffees.${index}.coffee`, value.selectedItem?.value)
                                }}
                                createNewDialog={createNewCoffeeDialog}
                              />
                            </div>
                            <button type="button" onClick={() => arrayHelpers.remove(index)}>
                              Remove
                            </button>
                          </div>
                        )
                      })}
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.insert(values.sessionCoffees.length + 1, {sampleNumber: '', coffee: ''})
                          }
                        >
                          Add
                        </button>
                      </div>
                    </>
                  )
                }}
              </FieldArray>
              <Button type="submit">Submit</Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default AddSessionCoffees
