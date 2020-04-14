# UseUserAddressFactory with Commerce Tools composable use case

## Motivation

We'd like to separate a logic for the user addresses according to single responsibility principle. It's also more agnostic approach.

## Factory interface

```TS
// factory schema
export interface UseUserAddressFactory<ADDRESS, SEARCH_PARAMS> {
  addresses: ComputedProperty<ADDRESS[]>;
  totalAddresses: ComputedProperty<number>;
  searchAddresses: (params?: SEARCH_PARAMS) => Promise<void>;
  addShippingAddress: (address: ADDRESS) => Promise<void>;
  addBillingAddress: (address: ADDRESS) => Promise<void>;
  getShippingAddresses: () => ADDRESS[];
  getBillingAddresses: () => ADDRESS[];
  deleteAddress: (address: ADDRESS) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

## Factory params

```TS
// factory params schema
export type UseUserAddressFactoryParams<ADDRESS, SEARCH_PARAMS> = {
  searchAddresses: (params?: SEARCH_PARAMS) => Promise<ADDRESS[]>;
  addShippingAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  addBillingAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  getShippingAddresses: () => ADDRESS[];
  getBillingAddresses: () => ADDRESS[];
  deleteAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
  updateAddress: (address: ADDRESS) => Promise<ADDRESS[]>;
}
```

## User address for Commerce Tools purposes
CT GraphQL API requires from us to update user addresses through the user entity.
That means every successfull request increments user's version field.

In this case it's required to update the user object after every (expect readonly) request. There are several ways to do this:

1. Provide useUser composable as a dependency to the factory:
2. Any factory param that affects user address will return both updated entities: `user` and `address`
3. Mutate the user (or any other required object) directly in composable

### 1st approach: dependency injection
That was proposed here: https://github.com/DivanteLtd/next/pull/335 but they way of providing dependency isn't still decided.

### 2nd approach: mutate user and address
Example based on adding a new address.

```TS
// factory params
interface UseUserAddressFactoryParams<USER, ADDRESS, SEARCH_PARAMS> {
  addAddress: (address: ADDRESS) => { updatedUser: USER, updatedAddresses: ADDRESS[] };
}
```

```TS
// factory schema
interface UseUserAddressFactory {
  addAddress: (address: ADDRESS) => Promise<void>;
}
```

```TS
// factory usage
import { user } from 'somewhere, where is shared user for factories';

export function useUserAddressFactory<USER, ADDRESS, SEARCH_PARAMS>(factoryParams) {
  const addresses = ref([]);

  const addAddress = async (address) => {
    const { updatedUser, updatedAddresses } = await factoryParams.addAddress(address);

    user.value = updatedUser;
    addresses.value = updatedAddresses;
  };
}
```

### 3rd approach: mutate related entities in a composable
Example based on adding a new address.

```TS
// factory params
interface UseUserAddressFactoryParams<USER, ADDRESS, SEARCH_PARAMS> {
  addAddress: (address: ADDRESS) => Promise<ADDRESS[]>;

}
```

```TS
// factory schema
interface UseUserAddressFactory {
  addAddress: (address: ADDRESS) => Promise<void>;
}
```

```TS
// factory usage
export function useUserAddressFactory<ADDRESS, SEARCH_PARAMS>(factoryParams) {
  const addresses = ref([]);

  const addAddress = async (address) => {
    addresses.value = await factoryParams.addAddress(address);
  };
}
```

```TS
// CT factory params
import { user } from 'useUserComposable';

export const params: UseUserAddressFactoryParams<ADDRESS, SEARCH_PARAMS> = {
  addAddress: async (address: ADDRESS) => {
    const updatedUser = await apiAddAddress(address);

    user.value = updatedUser;

    return user.value.addresses;
  }
}
```
