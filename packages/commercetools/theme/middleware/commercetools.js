import { createAccessToken } from '@vue-storefront/commercetools-api';
import { setup } from '@vue-storefront/commercetools-api';
import { config } from './../plugins/commercetools-config';

export default async ({ app }) => {
  let currentToken = app.$cookies.get('vsf-commercetools-token');

  if (!currentToken) {
    currentToken = await createAccessToken();
  }

  app.$cookies.set('vsf-commercetools-token', currentToken);

  setup({ ...config, currentToken });
};

