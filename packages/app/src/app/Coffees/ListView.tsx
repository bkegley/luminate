/** @jsx jsx */
import {jsx, Flex, Box, Heading, Button, Card} from 'theme-ui'
import {useListCoffeesTableQuery} from '../../graphql'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Coffee, Tooltip} from '@luminate/gatsby-theme-luminate/src'
import {formatDistanceToNow, format} from 'date-fns'

interface Props extends RouteComponentProps {}

const ListCoffeesView = ({match, history}: Props) => {
  const {url} = match
  const {data, error, loading} = useListCoffeesTableQuery()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error!</div>
  }

  return (
    <Flex sx={{flexDirection: 'column'}}>
      <Flex sx={{alignItems: 'center', justifyContent: 'space-between', px: 4, mb: 4}}>
        <Box>
          <Heading as="h1">Coffee</Heading>
        </Box>
        <Box>
          <Button as="a" onClick={() => history.push(`${url}/create`)}>
            Create New
          </Button>
        </Box>
      </Flex>
      <Card>
        {data.listCoffees.edges.map(({node}, index) => {
          return (
            <div key={node?.id}>
              <Link to={`${url}/${node?.id}`} sx={{textDecoration: 'none', color: 'inherit'}}>
                <CoffeeRow coffee={node} index={index} />
              </Link>
            </div>
          )
        })}
      </Card>
    </Flex>
  )
}

interface CoffeeRowProps {
  coffee: Coffee
  index: number
}
const CoffeeRow = ({coffee, index}: CoffeeRowProps) => {
  return (
    <Flex sx={{py: 3, px: 4, bg: index % 2 == 0 ? 'inherit' : 'greys.0', alignItems: 'center'}}>
      <Box sx={{flex: 3}}>{coffee.name}</Box>
      <Box sx={{flex: 2}}>{coffee.country?.name}</Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(coffee.createdAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(coffee.createdAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
      <Box sx={{flex: 1}}>
        <Tooltip text={format(parseInt(coffee.updatedAt), 'EE, LLL do, yyyy')}>
          <span>{formatDistanceToNow(parseInt(coffee.updatedAt), {addSuffix: true})}</span>
        </Tooltip>
      </Box>
    </Flex>
  )
}

export default ListCoffeesView
