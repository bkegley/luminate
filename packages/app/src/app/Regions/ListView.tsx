/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useListRegionsQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Drawer} from '@luminate/gatsby-theme-luminate/src'
import CreateRegionForm from './CreateForm'

interface Props extends RouteComponentProps {}

const ListRegionsView = ({match}: Props) => {
  const [showCreateForm, setShowCreateForm] = React.useState(false)
  const toggleShowCreateForm = () => setShowCreateForm(old => !old)
  const {url} = match
  const {data, error, loading} = useListRegionsQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <div>
      <button onClick={toggleShowCreateForm}>Create New</button>
      {data.listRegions.edges.map(({node}) => {
        return (
          <div key={node?.id}>
            <Link to={`${url}/${node?.id}`}>
              <h2>{node?.name}</h2>
            </Link>
          </div>
        )
      })}
      <Drawer from="right" onClickOutside={toggleShowCreateForm} open={showCreateForm}>
        <CreateRegionForm />
      </Drawer>
    </div>
  )
}

export default ListRegionsView
