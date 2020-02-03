import { ApolloQueryResult } from 'apollo-client'
import { apolloClient } from '../../index'
import defaultQuery from './defaultQuery'
import { ProjectProjection } from './../../types/GraphQL';

interface ProjectProjectionData {
  project: ProjectProjection
}

const getProjectProjection = (): Promise<ApolloQueryResult<ProjectProjectionData>> => apolloClient.query({
  query: defaultQuery,
  variables: {},
  fetchPolicy: 'no-cache'
})

export default getProjectProjection
