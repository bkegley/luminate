import React from 'react'
import CuppingSessionUpdateForm from './UpdateForm'
import {useGetCuppingSessionQuery} from '../../graphql'
import {RouteComponentProps} from 'react-router-dom'

interface Params {
  id: string
}

interface CuppingSessionUpdatePageProps extends RouteComponentProps<Params> {}

const CuppingSessionUpdatePage = ({match}: CuppingSessionUpdatePageProps) => {
  const {id} = match.params
  const {data, error, loading} = useGetCuppingSessionQuery({variables: {id}})
  if (!data || error || loading) return null
  return <CuppingSessionUpdateForm cuppingSession={data.getCuppingSession} />
}

export default CuppingSessionUpdatePage
