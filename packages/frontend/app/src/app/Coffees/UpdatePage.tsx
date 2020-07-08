import React from 'react'
import CoffeeUpdateForm from './UpdateForm'
import {useGetCoffeeQuery} from '../../graphql'
import {Modal, useDialogState, Button} from '@luminate/gatsby-theme-luminate/src'
import {ShareCoffeeForm} from './ShareCoffeeForm'
import {Link} from 'react-router-dom'
import {ChevronLeft} from 'react-feather'

const CoffeeUpdatePage = ({match}) => {
  const {id} = match.params
  const {data, error, loading} = useGetCoffeeQuery({variables: {id}})
  const shareCoffeeDialog = useDialogState()

  if (!data || error || loading) return null
  return (
    <div>
      <Modal dialog={shareCoffeeDialog}>
        <div className="p-6 bg-white">
          <ShareCoffeeForm coffeeId={id} />
        </div>
      </Modal>
      <div className="flex items-center my-6 text-primary-600">
        <ChevronLeft size={12} className="mr-px" />
        <Link to={`/coffees/${id}`}>Back</Link>
      </div>
      <CoffeeUpdateForm coffee={data.getCoffee} />
    </div>
  )
}

export default CoffeeUpdatePage
