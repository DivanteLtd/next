jest.mock('@vue-storefront/factories', () => ({
  useUserFactory: jest.fn(() => () => {})
}));
jest.mock('@vue-storefront/commercetools-api', () => ({
  getMe: jest.fn()
}));

import { getMe as apiGetMe } from '@vue-storefront/commercetools-api';
import useUser from '../../src/useUser';
import {
  useUserFactory
} from '@vue-storefront/factories';

describe('useUser', () => {
  it('getUser param returns customer from API', async () => {
    const customer = { firstName: 'loaded customer', lastName: 'loaded customer' };

    (apiGetMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer } }});
    useUser();

    const factoryParams = (useUserFactory as jest.Mock).mock.calls[0][0];
    expect(await factoryParams.getUser()).toBe(customer);
  });
});
