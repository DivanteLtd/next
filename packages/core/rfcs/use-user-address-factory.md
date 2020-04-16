# UseUserAddressFactory with Commerce Tools composable use case

## Motivation

We need to extend useUserAddress type to show and modify user addresses.
Also, some eCommerce platforms requires updating user entity with every address modification (for example: CommerceTools).

## Factory interface
I have actually two proposition. The one feels more agnostic while the second one is shorter.

### 1st approach (more agnostic):
```TS
export interface UseUserAddressFactory<ADDRESS, SEARCH_PARAMS> {
  addresses: ComputedProperty<ADDRESS[]>;
  shippingAddresses: ComputedProperty<ADDRESS[]>;
  billingAddresses: ComputedProperty<ADDRESS[]>;
  totalAddresses: ComputedProperty<number>;
  loadAddresses: (params?: SEARCH_PARAMS) => Promise<void>;
  addAddress: (address: ADDRESS) => Promise<void>;
  addShippingAddress: (address: ADDRESS) => Promise<void>;
  addBillingAddress: (address: ADDRESS) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  deleteAddress: (address: ADDRESS) => Promise<void>;
  deleteBillingAddress: (address: ADDRESS) => Promise<void>;
  deleteShippingAddress: (address: ADDRESS) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

### 2nd approach (shorter):
```TS
export interface UseUserAddressFactory<ADDRESS, ADDRESS_TYPE = 'billing' | 'shipping', SEARCH_PARAMS> {
  addresses: ComputedProperty<ADDRESS[]>;
  shippingAddresses: ComputedProperty<ADDRESS[]>;
  billingAddresses: ComputedProperty<ADDRESS[]>;
  totalAddresses: ComputedProperty<number>;
  loadAddresses: (params?: SEARCH_PARAMS) => Promise<void>;
  addAddress: (address: ADDRESS, type?: ADDRESS_TYPE) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  deleteAddress: (address: ADDRESS, type?: ADDRESS_TYPE) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

## Factory params

### 1st: depending on agnostic approach
```TS
// factory params schema
export type UseUserAddressFactoryParams<ADDRESS, SEARCH_PARAMS> = {
  searchAddresses: (params?: SEARCH_PARAMS) => Promise<ADDRESS[]>;
  getBillingAddresses: () => ADDRESS[];
  getShippingAddresses: () => ADDRESS[];
  addAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  addBillingAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  addShippingAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  updateAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  deleteAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  deleteBillingAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  deleteShippingAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
}
```

### 2nd: shorter one
```TS
// factory params schema
export type UseUserAddressFactoryParams<ADDRESS, ADDRESS_TYPE = 'billing' | 'shipping', SEARCH_PARAMS> = {
  searchAddresses: (params?: SEARCH_PARAMS) => Promise<ADDRESS[]>;
  getByType: (type: ADDRESS_TYPE) => ADDRESS[];
  addAddress: (address: ADDRESS, type?: ADDRESS_TYPE) => Promise<ADDRESS[]>;
  updateAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  deleteAddress: (address: ADDRESS, type?: ADDRESS_TYPE) => Promise<ADDRESS[]>;
}
```

##  Other changes requirements:
We need to add a possibility to update a user
```TS
// FACTORY INTERFACE
export interface UseUser
<
  USER,
  UPDATE_USER_PARAMS
> {
  // ...leave all the stuff as they are now

  // needed to add this:
  setUser: (newUser: USER) => void;
  useUser: () => USER;
}
```

```TS
// FACTORY IMPLEMENTATION
export function useUserFactory<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends { email: string; password: string }>(
  factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>
) {
  // ...leave all the stuff as they are now

  // needed to add this:
  const setUser = (newUser: USER) => {
    user.value = newUser;
  };
  const useUser = () => user;

  return {
      user: computed(() => user.value),
      setUser,  // these both are required to be added
      useUser,  //
      updateUser,
      register,
      login,
      logout,
      isAuthenticated,
      changePassword,
      refreshUser,
      loading: computed(() => loading.value)
    };
}
```

## Commerce Tools Integration
In order to integrate CT we need a user instance to update it. It's required, because addresses are being updated through user update endpoint.

Below example when adding an address

### Factory params
```TS
import { setUser } from './useUser';

const factoryParams = {
  addAddress: async (address) => {
    const { user } = await apiAddAddress(address);

    setUser(user);

    return user.addresses;
  }
};
```

### Factory content
```TS
const useUserAddressFactory = () => {
  const addresses: ref([]);
  const loading: ref(false);

  const addAddress: async (address) => {
    loading.value = true;

    addresses.value = await factoryParams.addAddress(address);

    loading.value = false;
  }
};
```
