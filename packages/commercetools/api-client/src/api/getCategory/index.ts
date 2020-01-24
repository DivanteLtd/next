import { ApolloQueryResult } from 'apollo-client'
import gql from 'graphql-tag'
import { apolloClient, locale, localizedVariables } from './../../index'
import { CategorySearch } from './../../types/Api'
import { CategoryQueryResult } from './../../types/GraphQL'
import defaultQuery from './defaultQuery'
import { buildCategoryWhere } from './../../helpers/search'

interface CategoryData {
  categories: CategoryQueryResult
}

const getCategory = async (search?: CategorySearch): Promise<ApolloQueryResult<CategoryData>> => {
  if (!search) {
    return await apolloClient.query<CategoryData>({
      query: defaultQuery,
      variables: localizedVariables()
    })
  }

  if (search.customQuery) {
    const { query, variables } = search.customQuery

    return await apolloClient.query<CategoryData>({
      query: gql`${query}`,
      variables: localizedVariables(variables)
    })
  }

  return await apolloClient.query<CategoryData>({
    query: defaultQuery,
    variables: localizedVariables({
      where: buildCategoryWhere(search),
      limit: search.limit,
      offset: search.offset,
    })
  })
}

export default getCategory
