import { UseUserAddress } from '@vue-storefront/interfaces';
import { Address } from '../types/GraphQL';
import { addCustomerAddress, assignCustomerAddress, removeCustomerAddress, updateCustomerAddress } from '@vue-storefront/commercetools-api';
import { useUserAddressFactory, UseUserAddressFactoryParams, UpdatedUserAddresses } from '@vue-storefront/factories';
import { user } from '../useUser';
import { Customer } from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';

const transformAddresses = (customer: Customer): UpdatedUserAddresses<Customer, Address> => ({
  addresses: customer.addresses,
  user: customer
});

const params: UseUserAddressFactoryParams<Customer, Address> = {
  addresses: user.value && user.value.id ? user.value.addresses : [],
  addAddress: async (address, type) => {
    const { data } = await addCustomerAddress(user.value, address);
    const newAddress = data.updateMyCustomer.addresses.pop();

    const { data: { updateMyCustomer } } = await assignCustomerAddress(
      { ...user.value, ...data.updateMyCustomer },
      newAddress,
      type
    );

    return transformAddresses(updateMyCustomer);
  },
  updateAddress: async (address) => {
    const { data } = await updateCustomerAddress(user.value, address);

    return transformAddresses(data.updateMyCustomer);
  },
  deleteAddress: async (address) => {
    const { data } = await removeCustomerAddress(user.value, address);

    return transformAddresses(data.updateMyCustomer);
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

const useUserAddress: () => UseUserAddress<Address> = useUserAddressFactory<Address>(params);

export default useUserAddress;
