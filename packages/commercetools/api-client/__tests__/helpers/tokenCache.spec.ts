/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { storeToken, getToken, cleanToken } from './../../src/helpers/createCommerceToolsLink/tokenCache';
import { onTokenSave, onTokenRemove, onTokenRead } from './../../src/index';

jest.unmock('./../../src/helpers/createCommerceToolsLink/tokenCache');
jest.mock('./../../src/index');

describe('[commercetools-api-client] tokenCache', () => {
  it('returns null', () => {
    getToken();
    expect(onTokenRead).toBeCalled();
  });

  it('stores token', () => {
    const token = {
      access_token: 'token',
      expires_at: 111,
      expires_in: 222,
      scope: 'scope',
      token_type: 'token'
    };

    storeToken(token);

    expect(onTokenSave).toBeCalledWith(token);
  });

  it('clears token', () => {
    cleanToken();
    expect(onTokenRemove).toBeCalled();
  });
});
