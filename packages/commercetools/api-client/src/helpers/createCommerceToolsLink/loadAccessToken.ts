import { ApiConfig, CustomerCredentials } from './../../types/setup';
import { onTokenSave, onTokenRead } from './../../index';
import createAccessTokenFlow from './tokenFlow';

const loadAccessToken = async (config: ApiConfig, customerCredentials?: CustomerCredentials): Promise<string> => {
  const token = await createAccessTokenFlow(config, { currentToken: onTokenRead(), customerCredentials });

  onTokenSave(token);

  return token.access_token;
};

export default loadAccessToken;
