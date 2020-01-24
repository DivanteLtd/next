import { CartDraft } from './../../types/GraphQL'
import { apolloClient, locale, currency, localizedVariables } from './../../index'
import CreateCartMutation from './defaultMutation'
import { CartMutationResponse } from './../../types/Api'

interface CartData extends Omit<CartDraft, "currency"> {
  currency?: string
}

const createCart = async (cartDraft: CartData = {}): Promise<CartMutationResponse> => {
  return await apolloClient.mutate({
    mutation: CreateCartMutation,
    variables: localizedVariables({
      draft: {
        currency,
        ...cartDraft
      }
    })
  })
}

export default createCart
