/** @jsx jsx */
import {jsx, Card, Heading} from 'theme-ui'
import React from 'react'
import {Select, useUser, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {useUserSearchQuery, useAddUserToAccountMutation} from '../../graphql'

const AccountPage = () => {
  const {user, switchAccount} = useUser()
  const {data: users, loading, error, refetch} = useUserSearchQuery({variables: {searchText: ''}})
  const [
    addUserToAccount,
    {data: addUserData, loading: addUserLoading, error: addUserError},
  ] = useAddUserToAccountMutation()

  const accountOptions = user?.accounts?.map(account => ({name: account?.name, value: account?.id}))
  const activeAccount = accountOptions?.find(option => option.value === user?.account?.id)

  const userOptions = users?.listUsers?.edges.map(({node}) => ({name: node?.username, value: node?.id}))

  return (
    <Card sx={{p: 3}}>
      <Heading>Account!</Heading>
      <Select
        label="Account"
        options={accountOptions}
        initialSelectedItem={activeAccount}
        onChange={value => {
          if (value.selectedItem) {
            switchAccount({variables: {accountId: value.selectedItem.value.toString()}})
          }
        }}
      />
      <div>
        <Combobox
          label="Users"
          options={userOptions}
          loading={loading}
          onInputChange={value => refetch({searchText: value})}
          onChange={value => {
            console.log({data, value})
            if (value.selectedItem) {
              addUserToAccount({variables: {accountId: user?.account?.id, userId: value.selectedItem.value}})
            }
          }}
        />
      </div>
      <div>
        <pre>{JSON.stringify({users, loading, error}, null, 2)}</pre>
      </div>
    </Card>
  )
}

export default AccountPage
