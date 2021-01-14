import React from 'react'
import BrewerUpdateForm from './UpdateForm'
import {useGetBrewerQuery} from '../../graphql'
import {Link, useRouteMatch} from 'react-router-dom'
import {ChevronLeft} from 'react-feather'

const BrewerUpdatePage = () => {
  const {
    params: {id},
  } = useRouteMatch<{id: string}>()
  const {data, error, loading} = useGetBrewerQuery({variables: {id}})

  if (!data || error || loading) return null
  return (
    <div>
      <div className="flex items-center my-6 text-primary-600">
        <ChevronLeft size={12} className="mr-px" />
        <Link to={`/coffees/${id}`}>Back</Link>
      </div>
      <BrewerUpdateForm brewer={data.getBrewer} />
    </div>
  )
}

export default BrewerUpdatePage
