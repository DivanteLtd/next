import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SetupConfig } from './types/setup'
import createCommerceToolsLink from './helpers/createCommerceToolsLink'
import getProduct from './api/getProduct'

let apolloClient: ApolloClient<any> = null

const setup = <TCacheShape>(setupConfig?: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(setupConfig.config),
    cache: new InMemoryCache(),
    ...setupConfig.customOptions
  })

  return apolloClient
}

export { apolloClient, setup, getProduct }
