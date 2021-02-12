import React from 'react'
import {useApolloClient} from '@apollo/client'
import {Select, useUser, Card, Heading, Combobox} from '@luminate/gatsby-theme-luminate/src'
import {useUserSearchQuery, useAddUserToAccountMutation} from '../../graphql'

const AccountPage = () => {
  const {user, switchAccount} = useUser()
  const client = useApolloClient()
  const {data: users, loading, error, refetch} = useUserSearchQuery({variables: {searchText: ''}})
  const [
    addUserToAccount,
    {data: addUserData, loading: addUserLoading, error: addUserError},
  ] = useAddUserToAccountMutation()

  const accountOptions = user?.accounts?.map(account => ({name: account?.name, value: account?.id}))
  const activeAccount = accountOptions?.find(option => option.value === user?.account?.id)

  const userOptions = users?.listUsers?.edges.map(({node}) => ({name: node?.username, value: node?.id}))

  return (
    <Card className="p-4">
      <Heading as="h3">Account</Heading>
      <label className="block mb-1" htmlFor="account">
        Account
      </label>
      <Select
        id="account"
        options={accountOptions}
        initialSelectedItem={activeAccount}
        onChange={value => {
          if (value.selectedItem) {
            switchAccount({variables: {accountId: value.selectedItem.value.toString()}}).then(() => {
              client.clearStore()
            })
          }
        }}
      />
      <div>
        <label className="block mb-1" htmlFor="users">
          Users
        </label>
        <Combobox
          id="users"
          options={userOptions}
          loading={loading}
          onInputChange={value => refetch({searchText: value})}
          onChange={value => {
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
