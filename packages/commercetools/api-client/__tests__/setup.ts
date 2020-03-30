import { setup } from './../src/index';

jest.mock('./../src/helpers/createCommerceToolsLink');
jest.mock('./../src/api/updateCart', () => jest.fn((arg) => arg));
jest.mock('./../src/api/createMyOrderFromCart', () => jest.fn((arg) => arg));
jest.mock('apollo-client');
jest.mock('@commercetools/sdk-auth', () => jest.fn(() => ({
  anonymousFlow: () => Promise.resolve('anonymous flow'),
  customerPasswordFlow: () => Promise.resolve('customer password flow'),
  refreshTokenFlow: () => Promise.resolve('refresh token flow')
})));

setup({
  api: {} as any,
  locale: 'en',
  currency: 'USD',
  country: 'UK',
  cookies: {
    currencyCookieName: 'test-vsf-currency',
    countryCookieName: 'test-vsf-country',
    localeCookieName: 'test-vsf-locale'
  },
  tokenEvents: {
    onTokenChange: jest.fn(),
    onTokenRemove: jest.fn()
  }
});
