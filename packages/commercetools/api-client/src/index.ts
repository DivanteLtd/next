import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SetupConfig } from './types/setup'
import createCommerceToolsLink from './helpers/createCommerceToolsLink'
import getProduct from './api/getProduct'
import getCategory from './api/getCategory'
import createCart from './api/createCart'
import updateCart from './api/updateCart'
import getCart from './api/getCart'
import addToCart from './api/addToCart'
import removeFromCart from './api/removeFromCart'
import updateCartQuantity from './api/updateCartQuantity'
import getMe from './api/getMe'
import getStorage from './helpers/createCommerceToolsLink/getStorage'

let apolloClient: ApolloClient<any> = null
let locale = null
let currency = 'USD'

const localizedVariables = (variables: object = {}) => ({
  ...variables,
  locale: locale === null ? 'en' : locale.value
})

const setup = <TCacheShape>(setupConfig?: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(setupConfig.api),
    cache: new InMemoryCache(),
    ...setupConfig.customOptions
  })
  locale = setupConfig.locale
  currency = setupConfig.currency

  return apolloClient
}

export {
  apolloClient,
  setup,
  locale,
  localizedVariables,
  currency,
  getStorage,
  getProduct,
  getCategory,
  createCart,
  updateCart,
  getCart,
  addToCart,
  removeFromCart,
  getMe,
  updateCartQuantity
}
