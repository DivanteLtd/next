import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SetupConfig, StoreConfig } from './types/setup'
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
import placeOrder from './api/placeOrder'
import createMyOrderFromCart from './api/createMyOrderFromCart'
import getShippingMethods from './api/getShippingMethods'
import updateShippingDetails from './api/updateShippingDetails'
import getStorage from './helpers/createCommerceToolsLink/getStorage'

let apolloClient: ApolloClient<any> = null
let locale = 'en'
let currency = 'USD'
let country = 'US'

const setup = <TCacheShape>(setupConfig?: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(setupConfig.api),
    cache: new InMemoryCache(),
    ...setupConfig.customOptions
  })
  locale = setupConfig.locale
  currency = (setupConfig.currency || '').toUpperCase()
  country = setupConfig.country

  return apolloClient
}

const updateStoreConfig = (storeConfig: StoreConfig) => {
  locale = storeConfig.locale
  currency = (storeConfig.currency || '').toUpperCase()
}

export {
  apolloClient,
  setup,
  locale,
  currency,
  country,
  getStorage,
  getProduct,
  getCategory,
  createCart,
  updateCart,
  getCart,
  addToCart,
  removeFromCart,
  getMe,
  updateCartQuantity,
  updateStoreConfig,
  placeOrder,
  createMyOrderFromCart,
  getShippingMethods,
  updateShippingDetails
}
