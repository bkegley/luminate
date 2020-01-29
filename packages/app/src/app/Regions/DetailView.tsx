/** @jsx jsx */
import React from 'react'
import {jsx} from 'theme-ui'
import {useGetRegionQuery} from '../../graphql'
import {Box, Button, Drawer} from '@luminate/gatsby-theme-luminate/src'
import {RouteComponentProps} from 'react-router-dom'
import RegionUpdateForm from './UpdateForm'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {}

const RegionDetailView = ({match}: Props) => {
  const [showUpdateRegion, setShowUpdateRegion] = React.useState(false)
  const toggleUpdateForm = () => setShowUpdateRegion(old => !old)
  const {
    params: {id},
  } = match
  const {data, error, loading} = useGetRegionQuery({variables: {id}})

  if (error) {
    return <div>Error!</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.getRegion) {
    return null
  }

  return (
    <div>
      <h1>{data.getRegion?.name}</h1>
      <Button onClick={toggleUpdateForm} variant="secondary">
        Edit
      </Button>
      <Drawer
        from="right"
        onClickOutside={toggleUpdateForm}
        open={showUpdateRegion}
        bg="white"
        width={['90%', '75%', '50%']}
      >
        <Box sx={{p: 4}}>
          <RegionUpdateForm region={data.getRegion} />
        </Box>
      </Drawer>
    </div>
  )
}

export default RegionDetailView
