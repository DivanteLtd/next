import { apolloClient, localizedVariables } from './../../index'
import { CartQueryResponse } from './../../types/Api'
import defaultQuery from './defaultQuery'

const getCart = async (cartId: string): Promise<CartQueryResponse> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: localizedVariables({ cartId }),
    fetchPolicy: 'no-cache'
  })
}

export default getCart
