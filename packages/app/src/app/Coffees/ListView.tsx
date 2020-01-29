/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useListCoffeesQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Drawer} from '@luminate/gatsby-theme-luminate/src'
import CreateCoffeeForm from './CreateForm'

interface Props extends RouteComponentProps {}

const ListCoffeesView = ({match}: Props) => {
  const [showCreateForm, setShowCreateForm] = React.useState(false)
  const toggleShowCreateForm = () => setShowCreateForm(old => !old)
  const {url} = match
  const {data, error, loading} = useListCoffeesQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <div>
      <button onClick={toggleShowCreateForm}>Create New</button>
      {data.listCoffees.edges.map(({node}) => {
        return (
          <div key={node?.id}>
            <Link to={`${url}/${node?.id}`}>
              <h2>{node?.name}</h2>
            </Link>
          </div>
        )
      })}
      <Drawer from="right" onClickOutside={toggleShowCreateForm} open={showCreateForm}>
        <CreateCoffeeForm />
      </Drawer>
    </div>
  )
}

export default ListCoffeesView
