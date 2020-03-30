import { setup } from '@vue-storefront/commercetools-api';
import { config } from './commercetools-config';

export default ({ app }) => {
  const currentToken = app.$cookies.get('vsf-commercetools-token');

  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set('vsf-commercetools-token', token);
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove('vsf-commercetools-token');
  };

  setup({
    ...config,
    currentToken,
    tokenEvents: {
      onTokenChange,
      onTokenRemove
    }
  });
};
