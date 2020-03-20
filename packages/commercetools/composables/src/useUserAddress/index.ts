import { UseUserAddress } from '@vue-storefront/interfaces';
import { AddressInput } from '../types/GraphQL';
import { addCustomerAddress, assignCustomerAddress, removeCustomerAddress, updateCustomerAddress } from '@vue-storefront/commercetools-api';
import { useUserAddressFactory, UseUserAddressFactoryParams } from '@vue-storefront/factories';
import { user } from '../useUser';
import { Customer } from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';

const updateUser = (newUserData: Customer) => {
  user.value = {
    ...user.value,
    ...newUserData
  };
};

const params: UseUserAddressFactoryParams<AddressInput> = {
  addresses: user.value && user.value.id ? user.value.addresses : [],
  addAddress: async (address, type) => {
    const { data } = await addCustomerAddress(user.value, address);

    updateUser(data.updateMyCustomer);

    const newAddress = data.updateMyCustomer.addresses.pop();
    const { data: data2 } = await assignCustomerAddress(user.value, newAddress, type);

    updateUser(data2.updateMyCustomer);
  },
  updateAddress: async (address) => {
    const { data } = await updateCustomerAddress(user.value, address);

    updateUser(data.updateMyCustomer);
  },
  deleteAddress: async (address) => {
    const { data } = await removeCustomerAddress(user.value, address);

    updateUser(data.updateMyCustomer);
  },
  getBillingAddresses: () => {
    const { addresses, billingAddressIds } = user.value;

    return (addresses || []).filter(({ id }) => (billingAddressIds || []).includes(id));
  },
  getShippingAddresses: () => {
    const { addresses, shippingAddressIds } = user.value;

    return (addresses || []).filter(({ id }) => (shippingAddressIds || []).includes(id));
  },
  searchAddresses: async () => user.value.addresses
};

const useUserAddress: () => UseUserAddress<AddressInput> = useUserAddressFactory<AddressInput>(params);

export default useUserAddress;
