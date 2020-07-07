import React from 'react'
import CoffeeUpdateForm from './UpdateForm'
import {useGetCoffeeQuery} from '../../graphql'
import {Modal, useDialogState, Button} from '@luminate/gatsby-theme-luminate/src'
import {ShareCoffeeForm} from './ShareCoffeeForm'

const CoffeeUpdatePage = ({match}) => {
  const {id} = match.params
  const {data, error, loading} = useGetCoffeeQuery({variables: {id}})
  const shareCoffeeDialog = useDialogState()

  if (!data || error || loading) return null
  return (
    <div>
      <Modal dialog={shareCoffeeDialog}>
        <div className="p-6 bg-white">
          <ShareCoffeeForm />
        </div>
      </Modal>
      <Button variant="secondary" onClick={shareCoffeeDialog.toggle}>
        Share
      </Button>
      <CoffeeUpdateForm coffee={data.getCoffee} />
    </div>
  )
}

export default CoffeeUpdatePage
