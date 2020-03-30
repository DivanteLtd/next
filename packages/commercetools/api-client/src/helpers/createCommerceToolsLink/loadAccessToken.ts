import { ApiConfig, CustomerCredentials } from './../../types/setup';
import { tokenEvents } from './../../index';
import createAccessTokenFlow from './tokenFlow';

const loadAccessToken = async (config: ApiConfig, customerCredentials?: CustomerCredentials): Promise<string> => {
  const token = await createAccessTokenFlow(config, { currentToken: tokenEvents.onTokenRead(), customerCredentials });

  tokenEvents.onTokenSave(token);

  return token.access_token;
};

export default loadAccessToken;
