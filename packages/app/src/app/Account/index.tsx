/** @jsx jsx */
import {jsx, Flex, Box, Heading} from 'theme-ui'
import React from 'react'
import {Select, useUser} from '@luminate/gatsby-theme-luminate/src'
import {useSwitchAccountMutation} from '../../graphql'

const AccountPage = () => {
  const {data, switchAccount} = useUser()

  const accountOptions = data.accounts.map(account => ({name: account.name, value: account.id}))
  const activeAccount = accountOptions.find(option => option.value === data.account.id)
  return (
    <div>
      <Heading>Account!</Heading>
      <Select
        label="Account"
        options={accountOptions}
        initialSelectedItem={activeAccount}
        onChange={value => {
          console.log({value})
          if (value.selectedItem) {
            switchAccount(value.selectedItem.value.toString())
          }
        }}
      />
    </div>
  )
}

export default AccountPage
