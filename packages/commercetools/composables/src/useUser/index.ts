import { UseUser } from '@vue-storefront/interfaces';
import {
  customerSignMeUp as apiCustomerSignMeUp,
  customerSignMeIn as apiCustomerSignMeIn,
  customerSignOut as apiCustomerSignOut,
  getMe as apiGetMe
} from '@vue-storefront/commercetools-api';
import {
  Customer,
  CustomerSignMeUpDraft,
  CustomerSignMeInDraft
} from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';
import {
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/factories';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

const authenticate = async (userData: UserData, fn) => {
  try {
    const userResponse = await fn(userData);
    return {
      user: userResponse.data.user.customer,
      cart: userResponse.data.user.cart
    };
  } catch (err) {
    console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
  }
};

const params: UseUserFactoryParams<Customer, UserData, any> = {
  getUser: async (customer = true) => {
    await apiGetMe({ customer });
  },

  updateUser: async (params: any) => {
    console.log(params);
  },

  register: async userData => {
    await authenticate(userData, apiCustomerSignMeUp);
  },

  login: async userData => {
    const customerLoginDraft = {
      email: userData.username,
      password: userData.password
    };
    await authenticate(customerLoginDraft, apiCustomerSignMeIn);
  },

  logout: async () => {
    apiCustomerSignOut();
  }
};
const useUser: () => UseUser<Customer, any> = useUserFactory<Customer, any>(
  params
);

export default useUser;
