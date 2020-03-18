import { UseUserAddress } from '@vue-storefront/interfaces';
import { AddressInput } from '../types/GraphQL';
import { useUserAddressFactory, UseUserAddressFactoryParams } from '@vue-storefront/factories';
import { user } from '../useUser';

const params: UseUserAddressFactoryParams<AddressInput> = {
  addresses: user.value && user.value.id ? user.value.addresses : [],
  addAddress: async () => {},
  updateAddress: async () => {},
  deleteAddress: async () => {},
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
