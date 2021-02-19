import React from 'react'
import CoffeeUpdateForm from './UpdateForm'
import {useGetCoffeeQuery} from '../../graphql'
import {Modal, useDialogState} from '@luminate/gatsby-theme-luminate/src'
import {Icon, IconTypesEnum} from '@luminate/components'
import {ShareCoffeeForm} from './ShareCoffeeForm'
import {Link, useRouteMatch} from 'react-router-dom'

const CoffeeUpdatePage = () => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()
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
        <span className="h-3 w-3">
          <Icon type={IconTypesEnum.CHEVRON_LEFT} />
        </span>
        <Link to={`/coffees/${id}`}>Back</Link>
      </div>
      <CoffeeUpdateForm coffee={data.getCoffee} />
    </div>
  )
}

export default CoffeeUpdatePage
