import { CartUpdateAction } from '../../types/GraphQL'
import { apolloClient, locale } from '../../index'
import CreateCartMutation from './defaultMutation'
import { CartMutationResponse } from './../../types/Api'

interface UpdateCart {
  id: string
  version: number
  actions: CartUpdateAction[]
}

const updateCart = async (cartData: UpdateCart): Promise<CartMutationResponse> => {
  return await apolloClient.mutate({
    mutation: CreateCartMutation,
    variables: {
      ...cartData,
      locale
    },
    fetchPolicy: 'no-cache'
  })
}

export default updateCart
