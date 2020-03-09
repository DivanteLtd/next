import { UseUser } from '@vue-storefront/interfaces';
import {
  customerSignMeUp as apiCustomerSignMeUp,
  customerSignMeIn as apiCustomerSignMeIn,
  customerSignOut as apiCustomerSignOut,
  getMe as apiGetMe
  // customerChangeMyPassword as apiCustomerChangeMyPassword
} from '@vue-storefront/commercetools-api';
import {
  Customer,
  CustomerSignMeUpDraft,
  CustomerSignMeInDraft,
  Cart
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

const params: UseUserFactoryParams<Customer, Cart, any> = {
  getUser: async (customer = true) => {
    await apiGetMe({ customer });
  },

  updateUser: async (params: any) => {
    console.log(params);
  },

  register: async userData => {
    await authenticate(userData, apiCustomerSignMeUp);
  },

  login: async ({ username, password }) => {
    const customerLoginDraft = { email: username, password };
    await authenticate(customerLoginDraft, apiCustomerSignMeIn);
  },

  logout: async () => {
    await apiCustomerSignOut();
  }

  // changePassword: async (currentPassword: string, newPassword: string) => {
  //   loading.value = true;
  //   try {
  //     const userResponse = await apiCustomerChangeMyPassword(user.value.version, currentPassword, newPassword);
  //     // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
  //     await logout();
  //     await authenticate({ email: userResponse.data.user.email, password: newPassword }, customerSignMeIn);
  //     user.value = userResponse.data.user;
  //   } catch (err) {
  //     error.value = err.graphQLErrors ? err.graphQLErrors[0].message : err;
  //   }
  //   loading.value = false;
  // };
};
const useUser: () => UseUser<Customer, any> = useUserFactory<Customer, any>(
  params
);

export default useUser;
