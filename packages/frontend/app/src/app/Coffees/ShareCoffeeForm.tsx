import React from 'react'
import {useUpdateCoffeePermissionsMutation} from '../../graphql'
import {Formik, Form, Field, validateYupSchema} from 'formik'
import {Input, Button, Combobox, PermissionTypeEnum} from '@luminate/gatsby-theme-luminate/src'
import Tag from '../../components/Tag'

export interface ShareCoffeeFormProps {
  coffeeId: string
}

export const ShareCoffeeForm = ({coffeeId}: ShareCoffeeFormProps) => {
  const [updateCoffeePermissions, {error, loading, data}] = useUpdateCoffeePermissionsMutation()
  console.log({coffeeId})

  return (
    <Formik
      initialValues={{coffeeId, accountId: '', permissionTypes: [] as Array<{name: string; value: string}>}}
      onSubmit={values => {
        updateCoffeePermissions({
          variables: {
            ...values,
            permissionTypes: values.permissionTypes.map(permissionType => permissionType.value) as PermissionTypeEnum[],
          },
        })
      }}
    >
      {({setFieldValue, values}) => {
        return (
          <Form>
            <div>
              <label htmlFor="accountId">Account Id</label>
              <Field name="accountId" id="accountId" as={Input} />
            </div>
            <div className="my-3">
              <label className="block mb-1" htmlFor="permissions">
                Permissions
              </label>
              <Combobox
                id="permissions"
                options={[
                  {name: 'read', value: 'read'},
                  {name: 'write', value: 'write'},
                  {name: 'admin', value: 'admin'},
                ].filter(
                  option => !values.permissionTypes.find(value => value && option && value.value === option.value),
                )}
                onChange={value =>
                  setFieldValue(
                    'permissionTypes',
                    value.selectedItem ? values.permissionTypes.concat(value.selectedItem) : values.permissionTypes,
                  )
                }
              />
              <div className="flex flex-wrap px-2">
                {values.permissionTypes.map(permissionType => {
                  return (
                    <div key={permissionType?.value} className="m-1">
                      <Tag
                        text={permissionType?.name || ''}
                        onCloseClick={() =>
                          setFieldValue(
                            'permissionTypes',
                            values.permissionTypes.filter(perm => perm.value !== permissionType.value),
                          )
                        }
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <Button variant="primary" type="submit">
              Share
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}
