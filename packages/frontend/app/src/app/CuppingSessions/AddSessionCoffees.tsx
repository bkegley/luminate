import React from 'react'
import {useUpdateCuppingSessionMutation, CuppingSession, useListCoffeesQuery} from '../../graphql'
import {Formik, Form, FieldArray, Field} from 'formik'
import {Input, Combobox, Modal, useDialogState, Button, Card} from '@luminate/gatsby-theme-luminate/src'
import CreateNewCoffeeForm from '../Coffees/CreateForm'
import {Trash, PlusCircle} from 'react-feather'

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
      <Card className=" py-4 mb-32">
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
              <Form className="w-full">
                <div className="flex items-center justify-between mb-4 px-4 uppercase tracking-wide text-gray-600 text-sm">
                  <div className="w-5/12">Sample Name</div>
                  <div className="w-5/12">Coffee</div>
                  <div className="w-1/12" />
                </div>
                <FieldArray name="sessionCoffees">
                  {arrayHelpers => {
                    return (
                      <>
                        {values.sessionCoffees.map((session, index) => {
                          return (
                            <div
                              className={`flex items-center justify-between py-2 px-4 bg-${
                                index % 2 === 0 ? 'gray-100' : 'transparent'
                              }`}
                            >
                              <div className="w-5/12">
                                <Field as={Input} name={`sessionCoffees.${index}.sampleNumber`} />
                              </div>
                              <div className="w-5/12">
                                <Combobox
                                  options={coffeeOptions}
                                  initialSelectedItem={coffeeOptions?.find(option => option.value === session.coffee)}
                                  loading={coffeeLoading}
                                  onChange={value => {
                                    setFieldValue(`sessionCoffees.${index}.coffee`, value.selectedItem?.value)
                                  }}
                                  createNewDialog={createNewCoffeeDialog}
                                />
                              </div>
                              <div className="w-1/12">
                                <button
                                  className="border-none bg-transparent text-red-600"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                        <div className="flex justify-end my-4 px-4">
                          <button
                            className="border-none bg-transparent text-primary-600 flex items-center"
                            type="button"
                            onClick={() =>
                              arrayHelpers.insert(values.sessionCoffees.length + 1, {sampleNumber: '', coffee: ''})
                            }
                          >
                            <div className="mr-2">Add New</div>
                            <PlusCircle />
                          </button>
                        </div>
                      </>
                    )
                  }}
                </FieldArray>
                <div className="flex justify-end px-4">
                  <Button className="w-1/4" type="submit">
                    Save Coffees
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </>
  )
}

export default AddSessionCoffees
