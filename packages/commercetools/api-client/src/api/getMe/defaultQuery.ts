import gql from 'graphql-tag';
import { CartFragment, CustomerFragment } from './../../fragments';

const basicProfile = gql`
  ${CartFragment}

  query getMe($locale: Locale!) {
    me {
      activeCart {
        ...DefaultCart
      }
    }
  }
`;

const fullProfile = gql`
  ${CartFragment}
  ${CustomerFragment}

  query getMe($locale: Locale!) {
    me {
      activeCart {
        ...DefaultCart
      }
      customer {
        ...DefaultCustomer
        addresses {
          id
          title
          firstName
          lastName
          streetName
          streetNumber
          postalCode
          city
          region
          state
          country
          apartment
          contactInfo {
            phone
          }
        }
        shippingAddressIds
      }
    }
  }
`;

export { basicProfile, fullProfile };
