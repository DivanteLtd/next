import { getMe as apiGetMe } from '@vue-storefront/commercetools-api';
// import useUser from '../../src/useUser';
jest.mock('@vue-storefront/commercetools-api', () => ({
  // customerSignMeUp: jest.fn(),
  // customerSignMeIn: jest.fn(),
  // customerSignOut: jest.fn(),
  apiGetMe: () => jest.fn()
  // customerChangeMyPassword: jest.fn()
}));
jest.mock('@vue-storefront/commercetools-api/lib/src/types/GraphQL', () => ({
  // Cart: jest.fn(),
  // Customer: jest.fn(),
  // CustomerSignMeUpDraft: jest.fn(),
  // CustomerSignMeInDraft: jest.fn()
}));

describe('useUser', () => {
  it('getUser param returns customer from API', () => {
    const customer = { firstName: 'loaded customer', lastName: 'loaded customer' };
    (apiGetMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer } }});
    // expect(useUser().getUser())
  });
});
