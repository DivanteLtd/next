import { setup } from '@vue-storefront/commercetools-api'

setup({
  api: {
    uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vsf-ct-dev',
    clientId: 'tKT3rKhAc5s3LXX-zuLooqjh',
    clientSecret: '7v1gLW03HfbmpouRfrcGvMz1pnXbRBTp',
    scopes: [
      'create_anonymous_token:vsf-ct-dev',
      'manage_my_orders:vsf-ct-dev',
      'manage_my_profile:vsf-ct-dev',
      'manage_my_shopping_lists:vsf-ct-dev',
      'manage_my_payments:vsf-ct-dev',
      'view_products:vsf-ct-dev',
      'view_published_products:vsf-ct-dev',
      'view_project_settings:vsf-ct-dev'
    ],
  },
  locale: 'en',
  country: 'US',
  currency: 'USD'
})
