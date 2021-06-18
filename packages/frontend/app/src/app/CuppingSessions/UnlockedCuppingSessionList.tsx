import React from 'react'
import {
  useUpdateCuppingSessionCoffeesMutation,
  useLockCuppingSessionMutation,
  CuppingSession,
  useListCoffeesQuery,
} from '../../graphql'
import {Formik, Form, FieldArray} from 'formik'
import {Modal, useDialogState} from '@luminate/gatsby-theme-luminate/src'
import {Button, Card, Icon, IconTypesEnum} from '@luminate/components'
import SessionCoffeeModalForm from './Coffees/ModalForm'

interface AddSessionCoffeesProps {
  cuppingSession: CuppingSession
}

const AddSessionCoffees = ({cuppingSession}: AddSessionCoffeesProps) => {
  const [updateCuppingSession, {}] = useUpdateCuppingSessionCoffeesMutation()
  const [lockCuppingSession, {}] = useLockCuppingSessionMutation({
    variables: {
      id: cuppingSession?.id,
    },
  })

  const addSessionCoffeeDialog = useDialogState()
  const lockSessionDialog = useDialogState()

  const {data: coffeeData, error: coffeeError, loading: coffeeLoading, refetch: coffeeRefetch} = useListCoffeesQuery()

  const coffeeOptions = coffeeData?.listCoffees.edges.map(({node}) => {
    return {
      name: node.name,
      value: node.id,
    }
  })

  return (
    <>
      <Modal dialog={lockSessionDialog}>
        <div className="bg-white p-10 rounded">
          <div className="mb-4">
            <p className="text-sm">Locking a cupping session cannot be undone.</p>
            <p className="text-sm">Are you sure you want to lock this?</p>
          </div>
          <div className="flex items-center justify-end">
            <div className="mr-4">
              <Button variant="outline" onClick={() => lockSessionDialog.toggle()}>
                Cancel
              </Button>
            </div>
            <div>
              <Button variant="danger" onClick={() => lockCuppingSession()}>
                Lock
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Card>
        <Formik
          initialValues={{
            sessionCoffees:
              cuppingSession.sessionCoffees?.map(session => ({
                sampleNumber: session?.sampleNumber || '',
                coffee: session?.coffee.id || '',
              })) || [],
          }}
          onSubmit={(values, {setSubmitting}) => {
            console.log({values})
            updateCuppingSession({
              variables: {
                id: cuppingSession.id,
                ...values,
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
          {({values}) => {
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
                        <Modal dialog={addSessionCoffeeDialog}>
                          <SessionCoffeeModalForm
                            coffeeOptions={coffeeOptions}
                            onSubmit={value => {
                              arrayHelpers.insert(values.sessionCoffees.length + 1, value)
                              addSessionCoffeeDialog.toggle()
                            }}
                            onCancel={() => addSessionCoffeeDialog.toggle()}
                            index={values.sessionCoffees.length + 1}
                          />
                        </Modal>
                        {values.sessionCoffees.map((session, index) => {
                          return (
                            <SessionCoffeeRow
                              coffee={coffeeOptions?.find(
                                option => option.value === values.sessionCoffees[index].coffee,
                              )}
                              coffeeOptions={coffeeOptions}
                              index={index}
                              onDelete={() => arrayHelpers.remove(index)}
                              onSubmit={value => arrayHelpers.replace(index, value)}
                              sampleNumber={values.sessionCoffees[index].sampleNumber}
                              key={session.sampleNumber}
                            />
                          )
                        })}
                        <div className="flex justify-end my-4 px-4">
                          <button
                            className="border-none bg-transparent text-primary-600 flex items-center"
                            type="button"
                            onClick={() => addSessionCoffeeDialog.toggle()}
                          >
                            <div className="mr-2">Add New</div>
                            <span className="w-3 h-4">
                              <Icon type={IconTypesEnum.TRASH} />
                            </span>
                          </button>
                        </div>
                      </>
                    )
                  }}
                </FieldArray>
                <div className="flex justify-end px-4">
                  <Button variant="outline" onClick={() => lockSessionDialog.toggle()}>
                    Lock
                  </Button>
                  <Button type="submit">Save Coffees</Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </>
  )
}

interface SessionCoffeeRowProps {
  index: number
  coffeeOptions?: Array<{name: string; value: string}>
  onSubmit: ({sampleNumber, coffee}: {sampleNumber: string; coffee: string}) => void
  onDelete: Function
  sampleNumber?: string
  coffee?: {name: string; value: string}
}

const SessionCoffeeRow = ({index, coffeeOptions, onSubmit, onDelete, sampleNumber, coffee}: SessionCoffeeRowProps) => {
  const sessionCoffeeDialog = useDialogState()

  return (
    <>
      <Modal dialog={sessionCoffeeDialog}>
        <SessionCoffeeModalForm
          coffeeOptions={coffeeOptions}
          onSubmit={values => {
            onSubmit(values)
            sessionCoffeeDialog.toggle()
          }}
          onCancel={() => sessionCoffeeDialog.toggle()}
          coffee={coffee?.value}
          sampleNumber={sampleNumber}
          index={index}
        />
      </Modal>
      <div
        className={`flex items-center py-3 px-4 ${index % 2 === 0 ? 'bg-transparent' : 'bg-gray-100 dark:bg-gray-800'}`}
      >
        <div className="w-5/12">{sampleNumber}</div>
        <div className="w-5/12">{coffee?.name}</div>
        <div className="w-1/12">
          <button
            className="border-none bg-transparent text-red-600"
            type="button"
            onClick={() => sessionCoffeeDialog.toggle()}
          >
            <div className="w-4 h-4">
              <Icon type={IconTypesEnum.PENCIL} />
            </div>
          </button>
        </div>
        <div className="w-1/12">
          <button className="border-none bg-transparent text-red-600" type="button" onClick={() => onDelete()}>
            <div className="w-4 h-4">
              <Icon type={IconTypesEnum.TRASH} />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default AddSessionCoffees
