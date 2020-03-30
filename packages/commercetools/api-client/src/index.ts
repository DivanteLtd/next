import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SetupConfig, TokenEvents, ApiConfig } from './types/setup';
import createCommerceToolsLink from './helpers/createCommerceToolsLink';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import createCart from './api/createCart';
import updateCart from './api/updateCart';
import getCart from './api/getCart';
import addToCart from './api/addToCart';
import removeFromCart from './api/removeFromCart';
import updateCartQuantity from './api/updateCartQuantity';
import getMe from './api/getMe';
import placeOrder from './api/placeOrder';
import createMyOrderFromCart from './api/createMyOrderFromCart';
import getShippingMethods from './api/getShippingMethods';
import updateShippingDetails from './api/updateShippingDetails';
import customerSignMeUp from './api/customerSignMeUp';
import customerSignMeIn from './api/customerSignMeIn';
import customerSignOut from './api/customerSignOut';
import getMyOrders from './api/getMyOrders';
import customerChangeMyPassword from './api/customerChangeMyPassword';
import createAccessToken from './helpers/createAccessToken';

import { Token } from './types/setup';

let apolloClient: ApolloClient<any> = null;
let locale = 'en';
let currency = '';
let country = '';
let countries = [];
let currencies = [];
let locales = [];
let currentToken: Token = null;
let api: ApiConfig = null;
let tokenEvents: TokenEvents = {
  onTokenChange: (token: Token) => {},
  onTokenRemove: () => {}
};
let cookies = {
  currencyCookieName: 'vsf-currency',
  countryCookieName: 'vsf-country',
  localeCookieName: 'vsf-locale'
};

const setup = <TCacheShape>(setupConfig: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  api = setupConfig.api || api;
  locale = setupConfig.locale || locale;
  currency = setupConfig.currency || currency;
  country = setupConfig.country || country;
  countries = setupConfig.countries || countries;
  currencies = setupConfig.currencies || currencies;
  locales = setupConfig.locales || locales;
  cookies = setupConfig.cookies || cookies;
  tokenEvents = setupConfig.tokenEvents || tokenEvents;
  currentToken = setupConfig.currentToken || currentToken;

  if (setupConfig.api) {
    apolloClient = new ApolloClient({
      link: createCommerceToolsLink(),
      cache: new InMemoryCache(),
      ...setupConfig.customOptions
    });
  }

  return apolloClient;
};

export {
  api,
  currentToken,
  createAccessToken,
  tokenEvents,
  apolloClient,
  setup,
  cookies,
  locale,
  locales,
  country,
  currency,
  countries,
  currencies,
  getProduct,
  getCategory,
  createCart,
  updateCart,
  getCart,
  addToCart,
  removeFromCart,
  getMe,
  updateCartQuantity,
  placeOrder,
  createMyOrderFromCart,
  getShippingMethods,
  updateShippingDetails,
  customerSignMeUp,
  customerSignMeIn,
  customerSignOut,
  getMyOrders,
  customerChangeMyPassword
};
