import { UseUserAddress, UserAddressType } from '@vue-storefront/interfaces';
import { Ref, ref, computed } from '@vue/composition-api';

export type UseUserAddressFactoryParams<ADDRESS, ADDRESS_TYPE = UserAddressType> = {
  addresses: ADDRESS[];
  searchAddresses: (params?: {
    [x: string]: any;
  }) => Promise<ADDRESS[]>;
  addAddress: (address: ADDRESS, type: ADDRESS_TYPE) => Promise<void>;
  deleteAddress: (address: ADDRESS) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  getBillingAddresses: () => ADDRESS[];
  getShippingAddresses: () => ADDRESS[];
}

export function useUserAddressFactory<ADDRESS, ADDRESS_TYPE = UserAddressType> (factoryParams: UseUserAddressFactoryParams<ADDRESS, ADDRESS_TYPE>) {
  const loading: Ref<boolean> = ref(false);

  const searchAddresses = async (params) => {
    loading.value = true;
    await factoryParams.searchAddresses(params).then(addresses => {
      factoryParams.addresses.length = 0;
      addresses.forEach(address => factoryParams.addresses.push(address));
    });
    loading.value = false;
  };

  const getBillingAddresses = () => factoryParams.getBillingAddresses();

  const getShippingAddresses = () => factoryParams.getShippingAddresses();

  const addAddress = async (address: ADDRESS, type: ADDRESS_TYPE) => {
    loading.value = true;
    await factoryParams.addAddress(address, type);
    loading.value = false;
  };

  const deleteAddress = async (address) => {
    loading.value = true;
    await factoryParams.deleteAddress(address);
    loading.value = false;
  };

  const updateAddress = async (address) => {
    loading.value = true;
    await factoryParams.updateAddress(address);
    loading.value = false;
  };

  return function useUserAddress(): UseUserAddress<ADDRESS, ADDRESS_TYPE> {
    return {
      addresses: computed(() => factoryParams.addresses),
      searchAddresses,
      addAddress,
      updateAddress,
      deleteAddress,
      getBillingAddresses,
      getShippingAddresses,
      loading
    };
  };
}
