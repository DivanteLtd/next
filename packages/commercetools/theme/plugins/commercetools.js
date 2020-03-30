import { setup } from '@vue-storefront/commercetools-api';
import { config } from './commercetools-config';

export default ({ app }) => {
  const onTokenSave = (token) => {
    try {
      app.$cookies.set('vsf-commercetools-token', token);
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRead = () => {
    return app.$cookies.get('vsf-commercetools-token');
  };

  const onTokenRemove = () => {
    app.$cookies.remove('vsf-commercetools-token');
  };

  setup({
    ...config,
    tokenEvents: {
      onTokenSave,
      onTokenRead,
      onTokenRemove
    }
  });
};
