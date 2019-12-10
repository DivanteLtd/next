import { ApolloQueryResult } from 'apollo-client'
import { apolloClient } from './../../index'
import { ProductSearch } from './../../types/Product'
import { Product } from './../../types/GraphQL'
import defaultQuery from './defaultQuery'

const getProduct = async (search: ProductSearch): Promise<ApolloQueryResult<Product>> => {
  const query = search.customQuery || defaultQuery
  const { variables } = search

  return await apolloClient.query<Product>({ query, variables })
}

export default getProduct
