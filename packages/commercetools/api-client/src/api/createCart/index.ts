import { CartDraft } from './../../types/GraphQL'
import { apolloClient, locale, currency } from './../../index'
import CreateCartMutation from './defaultMutation'
import { CartMutationResponse } from './../../types/Api'

interface CartData extends Omit<CartDraft, "currency"> {
  currency?: string
}

const createCart = async (cartDraft: CartData = {}): Promise<CartMutationResponse> => {
  return await apolloClient.mutate({
    mutation: CreateCartMutation,
    variables: {
      draft: {
        currency,
        ...cartDraft
      },
      locale
    }
  })
}

export default createCart
