import React from 'react'
import {useGetCoffeeQuery} from '../../graphql'
import {useDialogState, Modal} from '@luminate/gatsby-theme-luminate/src'
import {Link, RouteComponentProps, useHistory} from 'react-router-dom'
import {ShareCoffeeForm} from './ShareCoffeeForm'
import {Grid, Page, Card, Button, Heading} from '@luminate/components'
import {EntityPostListView} from '../Post/EntityListView'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {}

const CoffeeDetailView = ({match}: Props) => {
  const history = useHistory()
  const shareCoffeeDialog = useDialogState()
  const {
    params: {id},
  } = match
  const {data, error, loading} = useGetCoffeeQuery({variables: {id}})

  if (error) {
    return <div>Error!</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.getCoffee) {
    return null
  }

  return (
    <Page
      title={data.getCoffee?.name}
      primaryAction={{
        text: 'Create Post',
        onClick: () => history.push(`/posts/create?type=Coffee&id=${id}`),
        as: 'a',
      }}
      secondaryActions={[
        {
          text: 'Update',
          variant: 'outline',
          onClick: () => history.push(`/coffees/${id}/edit`),
          as: 'a',
        },
      ]}
    >
      <Modal dialog={shareCoffeeDialog}>
        <div className="p-6 bg-white">
          <ShareCoffeeForm coffeeId={id} />
        </div>
      </Modal>
      <Grid>
        <Grid.Left>
          <Card>
            <img src="https://picsum.photos/800/400" />
            <div className="p-6">
              <p className="text-xs tracking-wide text-gray-600 uppercase">Information Section</p>
              <p>This is some information about the coffee</p>
            </div>
          </Card>
        </Grid.Left>
        <Grid.Right>
          <Card>
            <div className="mb-3">
              <p className="text-xs tracking-wide text-gray-500 uppercase">Country</p>
              {data.getCoffee.country ? (
                <Link className="link" to={`/countries/${data.getCoffee.country?.id}`}>
                  {data.getCoffee.country?.name}
                </Link>
              ) : (
                '-'
              )}
            </div>
            <div className="mb-3">
              <p className="text-xs tracking-wide text-gray-500 uppercase">Region</p>
              {data.getCoffee.region ? (
                <Link className="link" to={`/regions/${data.getCoffee.region?.id}`}>
                  {data.getCoffee.region?.name}
                </Link>
              ) : (
                '-'
              )}
            </div>
            <div className="flex flex-col items-end">
              <div className="w-1/4">
                <Button type="button" variant="outline" onClick={shareCoffeeDialog.toggle}>
                  Share
                </Button>
              </div>
            </div>
          </Card>
        </Grid.Right>
      </Grid>
      <div>
        <Heading as="h3">Story</Heading>
      </div>
      <div>
        <EntityPostListView entityId={id} />
      </div>
    </Page>
  )
}

export default CoffeeDetailView
